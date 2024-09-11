import { DndContext } from "@dnd-kit/core";
import { StorageContextType } from "./StorageProvider";

const splitItemID = (input: string) => {
  const parts = input.split(/:(.+)/);
  return { storageName: parts[0], itemID: parts[1] };
};

const DragProvider = ({
  children,
  context1,
  context2,
}: {
  children: React.ReactNode;
  context1: StorageContextType;
  context2: StorageContextType;
}) => {
  return (
    <DndContext
      onDragMove={(event) => {
        // console.log("onDragEnd", event);
        const { active, over } = event;
        if (!over) return;
        // console.log("onDragEnd", active, over);

        const srcStorageNameItemID = splitItemID(active.id as string);
        const dstStorageNameItemID = splitItemID(over.id as string);

        if (
          srcStorageNameItemID.storageName === dstStorageNameItemID.storageName
        )
          return;

        let srcItem, dstItem;
        if (srcStorageNameItemID.storageName == context1.storage.name) {
          srcItem = context1.itemMap[srcStorageNameItemID.itemID];
          dstItem = context2.itemMap[dstStorageNameItemID.itemID];
        } else {
          srcItem = context2.itemMap[srcStorageNameItemID.itemID];
          dstItem = context1.itemMap[dstStorageNameItemID.itemID];
        }

        console.log(srcItem, dstItem);

        // const parts = input.split(/:(.+)/);
        // return [parts[0], parts[1]];
        // active;

        // context1.itemMap[active.id];

        if (over == null) {
          return;
        }

        // console.log(over);
      }}
    >
      {children}
    </DndContext>
  );
};

export default DragProvider;
