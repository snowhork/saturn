import { useListItemsItemsGet, useRootDirRootGet } from "./gen/default/default";
import { Item } from "./gen/schema";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useCallback, useEffect } from "react";
import { useStorageContext } from "./StorageProvider";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const DirLeaf = ({ item }: { item: Item }) => {
  const context = useStorageContext();

  const { data } = useListItemsItemsGet({
    name: context.storage.name,
    id: item.id,
    google_drive_token: context.googleDriveOauthToken?.access_token || null,
  });

  useEffect(() => {
    if (data) {
      for (const item of data.data) {
        context.addItem(item.id, item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // ignore context change

  if (!data)
    return <span className="text-sm text-gray-500 ml-8">Loading...</span>;

  return (
    <div>
      <>
        {data.data.map((item) => (
          <Leaf key={item.id} item={item} />
        ))}

        {data.data.length === 0 && (
          <span className="text-sm text-gray-500 ml-8">No items</span>
        )}
      </>
    </div>
  );
};

const DriveLink = ({ id }: { id: string }) => {
  const context = useStorageContext();

  if (!context.googleDriveOauthToken) return null;

  return (
    <a
      target="_blank"
      href={`https://drive.google.com/drive/folders/${id}`}
      className="text-xs pt-1 pl-3 text-blue-400 cursor-pointer"
    >
      <FaExternalLinkAlt />
    </a>
  );
};

const Leaf = ({ item }: { item: Item }) => {
  const context = useStorageContext();

  const storageNameItemId = `${context.storage.name}:${item.id}`;

  const {
    setNodeRef: draggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
    id: storageNameItemId,
  });

  const { setNodeRef: droppableRef, isOver } = useDroppable({
    id: storageNameItemId,
  });

  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  return item.is_dir ? (
    <div className="relative">
      <TreeItem
        itemId={item.id}
        label={
          <div
            ref={droppableRef}
            className={isOver ? "bg-blue-700 bg-opacity-50" : ""}
          >
            <div
              ref={draggableRef}
              {...attributes}
              {...listeners}
              style={{
                transform: transformStyle,
                height: "fit-content",
              }}
            >
              <div className="flex">
                {item.name}
                <DriveLink id={item.id} />
              </div>
            </div>
          </div>
        }
      >
        <DirLeaf item={item} />
      </TreeItem>
    </div>
  ) : (
    <TreeItem
      itemId={item.id}
      label={
        <div
          ref={droppableRef}
          className={isOver ? "bg-blue-700 bg-opacity-50" : ""}
        >
          <div
            ref={draggableRef}
            {...attributes}
            {...listeners}
            style={{
              transform: transformStyle,
              height: "fit-content",
            }}
          >
            <div className="flex">{item.name}</div>
          </div>
        </div>
      }
    ></TreeItem>
  );
};

export const RootNode = () => {
  const context = useStorageContext();

  const { data } = useRootDirRootGet({
    name: context.storage.name,
    google_drive_token: context.googleDriveOauthToken?.access_token || null,
  });

  const handleSelectedItems = useCallback(
    (_e: React.SyntheticEvent, ids: string[]) => {
      context.setSelectedItems(ids.map((id) => context.itemMap[id]));
    },
    [context]
  );

  useEffect(() => {
    if (data) {
      context.addItem(data.data.id, data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // ignore context change

  const apiRef = useTreeViewApiRef();

  useEffect(() => {
    const rootFolderID = data?.data.id;
    if (rootFolderID) {
      apiRef.current?.setItemExpansion({} as never, rootFolderID, true);
    }
  }, [apiRef, data?.data.id]);

  return (
    <SimpleTreeView
      onSelectedItemsChange={handleSelectedItems}
      multiSelect={true}
      apiRef={apiRef}
    >
      {data && <Leaf key={data?.data.name} item={data?.data} />}
    </SimpleTreeView>
  );
};
