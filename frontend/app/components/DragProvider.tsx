import { Active, DndContext, Over } from "@dnd-kit/core";
import { StorageContextType } from "./StorageProvider";
import { createContext, useCallback, useContext, useState } from "react";
import { Item } from "../gen/schema";

const splitItemID = (input: string) => {
  const parts = input.split(/:(.+)/);
  return { storageName: parts[0], itemID: parts[1] };
};

export type DragContextType = {
  src: StorageNameItem | null;
  dst: StorageNameItem | null;
};

const DragContext = createContext<DragContextType | null>(null);

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error("Storage context not found");
  return context;
};

export type StorageNameItem = {
  storageName: string;
  item: Item;
};

const handleEvent = (event: { active: Active; over: Over | null }) => {
  const { active, over } = event;
  const srcStorageNameItemID = splitItemID(active.id as string);

  if (!over) {
    return { srcStorageNameItemID, dstStorageNameItemID: null };
  }

  const dstStorageNameItemID = splitItemID(over.id as string);

  return { srcStorageNameItemID, dstStorageNameItemID };
};

const DragProvider = ({
  children,
  context1,
  context2,
  callback,
}: {
  children: React.ReactNode;
  context1: StorageContextType;
  context2: StorageContextType;
  callback: (v: { src: StorageNameItem; dst: StorageNameItem }) => void;
}) => {
  const [src, setSrc] = useState<StorageNameItem | null>(null);
  const [dst, setDst] = useState<StorageNameItem | null>(null);

  const onDrag = useCallback(
    (event: { active: Active; over: Over | null }) => {
      const { srcStorageNameItemID, dstStorageNameItemID } = handleEvent(event);
      if (srcStorageNameItemID.storageName == context1.storage.name) {
        const item = context1.itemMap[srcStorageNameItemID.itemID];
        setSrc({ storageName: context1.storage.name, item: item.item });
      } else {
        const item = context2.itemMap[srcStorageNameItemID.itemID];
        setSrc({ storageName: context2.storage.name, item: item.item });
      }

      if (!dstStorageNameItemID) {
        setDst(null);
        return;
      }

      if (
        srcStorageNameItemID.storageName === dstStorageNameItemID.storageName
      ) {
        setDst(null);
        return;
      }

      let dst; // dst が ファイルの場合は親ディレクトリにする
      if (srcStorageNameItemID.storageName == context1.storage.name) {
        dst = context2.itemMap[dstStorageNameItemID.itemID];

        if (!dst.item.is_dir) {
          if (dst.parentID == null) {
            throw new Error("Invalid parentID");
          }
          dst = context2.itemMap[dst.parentID];
        }

        setDst({
          storageName: context2.storage.name,
          item: dst.item,
        });
      } else {
        dst = context1.itemMap[dstStorageNameItemID.itemID];

        if (!dst.item.is_dir) {
          if (dst.parentID == null) {
            throw new Error("Invalid parentID");
          }
          dst = context1.itemMap[dst.parentID];
        }

        setDst({
          storageName: context1.storage.name,
          item: dst.item,
        });
      }
    },
    [context1, context2],
  );

  const onDragEnd = useCallback(() => {
    if (!src || !dst) {
      return;
    }

    callback({ src, dst });

    setSrc(null);
    setDst(null);
  }, [callback, dst, src]);

  return (
    <DragContext.Provider value={{ src, dst }}>
      <DndContext onDragOver={onDrag} onDragEnd={onDragEnd}>
        {children}
      </DndContext>
    </DragContext.Provider>
  );
};

export default DragProvider;
