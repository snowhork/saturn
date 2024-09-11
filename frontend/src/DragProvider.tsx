import { Active, DndContext, Over } from "@dnd-kit/core";
import { StorageContextType } from "./StorageProvider";
import { createContext, useCallback, useContext, useState } from "react";

const splitItemID = (input: string) => {
  const parts = input.split(/:(.+)/);
  return { storageName: parts[0], itemID: parts[1] };
};

export type DragContextType = {
  dstID: string | null;
};

const DragContext = createContext<DragContextType | null>(null);

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error("Storage context not found");
  return context;
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
  const [srcID, setSrcID] = useState<string | null>(null);
  const [dstID, setDstID] = useState<string | null>(null);

  const onDrag = useCallback(
    (event: { active: Active; over: Over | null }) => {
      const { active, over } = event;
      if (!over) {
        setDstID(null);
        return;
      }

      const srcStorageNameItemID = splitItemID(active.id as string);
      const dstStorageNameItemID = splitItemID(over.id as string);

      if (
        srcStorageNameItemID.storageName === dstStorageNameItemID.storageName
      ) {
        setDstID(null);
        return;
      }

      let src, dst;
      if (srcStorageNameItemID.storageName == context1.storage.name) {
        src = context1.itemMap[srcStorageNameItemID.itemID];
        dst = context2.itemMap[dstStorageNameItemID.itemID];

        if (!dst.item.is_dir) {
          if (dst.parentID == null) {
            throw new Error("Invalid parentID");
          }
          dst = context2.itemMap[dst.parentID];
        }
      } else {
        src = context2.itemMap[srcStorageNameItemID.itemID];
        dst = context1.itemMap[dstStorageNameItemID.itemID];

        if (!dst.item.is_dir) {
          if (dst.parentID == null) {
            throw new Error("Invalid parentID");
          }
          dst = context1.itemMap[dst.parentID];
        }
      }

      setDstID(dst.item.id);
    },
    [context1, context2]
  );

  const onDragEnd = useCallback(() => {
    setSrcID(null);
    setDstID(null);
  }, []);

  return (
    <DragContext.Provider value={{ dstID }}>
      <DndContext onDragOver={onDrag} onDragEnd={onDragEnd}>
        {children}
      </DndContext>
    </DragContext.Provider>
  );
};

export default DragProvider;
