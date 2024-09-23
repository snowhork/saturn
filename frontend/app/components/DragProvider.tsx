import { Active, DndContext, DragMoveEvent, Over } from "@dnd-kit/core";
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
  srcStorageName: string | null;
  srcIDs: Set<string>;
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

const getItemFromContext = (
  context1: StorageContextType,
  context2: StorageContextType,
  storageName: string,
  itemID: string,
) => {
  if (storageName == context1.storage.name) {
    return context1.itemMap[itemID];
  }

  if (storageName == context2.storage.name) {
    return context2.itemMap[itemID];
  }

  throw new Error("Invalid storageName: " + storageName);
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
  callback: (v: { src: StorageNameItem[]; dst: StorageNameItem }) => void;
}) => {
  const [srcStorageName, setSrcStorageName] = useState<string | null>(null);
  const [selectedIDs, setSelectedIDs] = useState<Set<string>>(new Set());

  const [active, setActive] = useState<StorageNameItem | null>(null);
  const [dst, setDst] = useState<StorageNameItem | null>(null);

  const onDragStart = useCallback(
    (event: { active: Active }) => {
      const { storageName, itemID } = splitItemID(event.active.id as string);

      if (srcStorageName != null && srcStorageName != storageName) {
        return;
      }

      setSelectedIDs((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(itemID)) {
          newSet.delete(itemID);

          if (newSet.size == 0) {
            setSrcStorageName(null);
          }
          return newSet;
        }

        setSrcStorageName(storageName);
        newSet.add(itemID);

        return newSet;
      });
    },
    [srcStorageName],
  );

  const onDragMove = useCallback(
    (event: DragMoveEvent) => {
      if (event.delta.x * event.delta.x + event.delta.y * event.delta.y < 60) {
        return;
      }

      const { storageName, itemID } = splitItemID(event.active.id as string);

      if (srcStorageName != null && srcStorageName != storageName) {
        return;
      }

      setActive({
        storageName,
        item: getItemFromContext(context1, context2, storageName, itemID).item,
      });

      setSelectedIDs((prev) => {
        if (selectedIDs.has(itemID)) {
          return prev;
        }
        const newSet = new Set(prev);
        newSet.add(itemID);
        setSrcStorageName(storageName);
        console.log("onDragMove", "append", newSet);
        return newSet;
      });
    },
    [context1, context2, selectedIDs, srcStorageName],
  );

  const onDragOver = useCallback(
    (event: { active: Active; over: Over | null }) => {
      const { srcStorageNameItemID, dstStorageNameItemID } = handleEvent(event);

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
    [
      context1.itemMap,
      context1.storage.name,
      context2.itemMap,
      context2.storage.name,
    ],
  );

  const onDragEnd = useCallback(() => {
    setActive(null);
    setDst(null);

    if (!srcStorageName || !dst || selectedIDs.size == 0) {
      return;
    }

    if (
      !active ||
      !selectedIDs.has(active.item.id) ||
      active.storageName != srcStorageName
    ) {
      return;
    }

    const src = Array.from(selectedIDs).map((id) => ({
      item: getItemFromContext(context1, context2, srcStorageName, id).item,
      storageName: srcStorageName,
    }));

    callback({ src, dst });
  }, [active, callback, context1, context2, dst, selectedIDs, srcStorageName]);

  return (
    <DragContext.Provider
      value={{ src: active, dst, srcIDs: selectedIDs, srcStorageName }}
    >
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        {children}
      </DndContext>
    </DragContext.Provider>
  );
};

export default DragProvider;
