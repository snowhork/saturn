import {
  useListItemsApiItemsGet,
  useRootDirApiRootGet,
} from "../gen/default/default";
import { Item } from "../gen/schema";
import { SimpleTreeView, TreeItem, useTreeViewApiRef } from "@mui/x-tree-view";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useCallback, useEffect, useMemo } from "react";
import { useStorageContext } from "./StorageProvider";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useDragContext } from "./DragProvider";

const DirLeaf = ({ item }: { item: Item }) => {
  const context = useStorageContext();

  const { data } = useListItemsApiItemsGet({
    name: context.storage.name,
    id: item.id,
    google_drive_token: context.googleDriveAccessToken || null,
  });

  useEffect(() => {
    if (data) {
      for (const child of data.data) {
        context.addItem(child.id, child, item.id);
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

  if (!context.googleDriveAccessToken) return null;

  return (
    <a
      target="_blank"
      href={`https://drive.google.com/drive/folders/${id}`}
      className="text-xs pt-1 pl-3 text-blue-400 cursor-pointer"
      rel="noreferrer"
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
  } = useDraggable({
    id: storageNameItemId,
  });

  const { src, srcIDs, srcStorageName, dst } = useDragContext();

  const isOver =
    dst?.storageName == context.storage.name && dst?.item.id == item.id;

  const { setNodeRef: droppableRef } = useDroppable({
    id: storageNameItemId,
  });

  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  const onDragCountBudge = useMemo(() => {
    if (src != null && src.item.id == item.id && srcIDs.has(item.id)) {
      return (
        <div className="flex items-center justify-center ml-2 mt-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full">
          {srcIDs.size}
        </div>
      );
    }

    return <></>;
  }, [item.id, src, srcIDs]);

  return (
    <div
      className={
        "rounded-sm " +
        (isOver ? "bg-blue-500 bg-opacity-50 " : "") +
        (srcStorageName == context.storage.name && srcIDs.has(item.id)
          ? "bg-green-500 bg-opacity-50 "
          : "") +
        (src != null && src.item.id != item.id && srcIDs.has(item.id)
          ? "opacity-50 "
          : "")
      }
    >
      <div ref={droppableRef}>
        <div>
          {item.is_dir ? (
            <div className="relative">
              <TreeItem
                itemId={item.id}
                label={
                  <div
                    className="flex"
                    ref={draggableRef}
                    {...attributes}
                    {...listeners}
                    style={{
                      transform: transformStyle,
                      height: "fit-content",
                    }}
                  >
                    {item.name}
                    <DriveLink id={item.id} />
                    {onDragCountBudge}
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
                  className="flex"
                  ref={draggableRef}
                  {...attributes}
                  {...listeners}
                  style={{
                    transform: transformStyle,
                    height: "fit-content",
                  }}
                >
                  {item.name}
                  {onDragCountBudge}
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const RootNode = () => {
  const context = useStorageContext();

  const { data } = useRootDirApiRootGet({
    name: context.storage.name,
    google_drive_token: context.googleDriveAccessToken || null,
  });

  const handleSelectedItems = useCallback(
    (_e: React.SyntheticEvent, ids: string[]) => {
      context.setSelectedItems(ids.map((id) => context.itemMap[id].item));
    },
    [context],
  );

  useEffect(() => {
    if (data) {
      context.addItem(data.data.id, data.data, null);
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
