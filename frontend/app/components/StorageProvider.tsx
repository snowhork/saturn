import React, { createContext, useState, useCallback, useContext } from "react";
import { Item, Storage } from "../gen/schema";
import GoogleDriveAuth from "./GoogleDriveAuth";

export type StorageContextType = {
  storage: Storage;

  authState: "waiting" | "ready";

  selectedItems: Item[];
  setSelectedItems: (item: Item[]) => void;

  itemMap: Record<string, { item: Item; parentID: string | null }>;
  addItem: (id: string, item: Item, parentID: string | null) => void;

  googleDriveAccessToken?: string;
  setGoogleDriveAccessToken: (token: string) => void;
};

const StorageContext = createContext<StorageContextType | null>(null);

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (!context) throw new Error("Storage context not found");
  return context;
};

export const useInitStorageContext = (storage: Storage): StorageContextType => {
  const [authState, setAuthState] = useState<"waiting" | "ready">(
    storage.type === "local" ? "ready" : "waiting",
  );
  const [itemMap, setItemMap] = useState<
    Record<string, { item: Item; parentID: string | null }>
  >({});
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const addItem = useCallback(
    (id: string, item: Item, parentID: string | null) => {
      setItemMap((prev) => ({ ...prev, [id]: { item, parentID } }));
    },
    [],
  );

  const [googleDriveAccessToken, _setGoogleDriveAccessToken] =
    useState<string>();

  const setGoogleDriveAccessToken = useCallback((token: string) => {
    _setGoogleDriveAccessToken(token);
    setAuthState("ready");
  }, []);

  return {
    storage,
    authState,
    selectedItems,
    setSelectedItems,
    itemMap,
    addItem,
    googleDriveAccessToken,
    setGoogleDriveAccessToken,
  };
};

const StorageAuth = ({ children }: { children: React.ReactNode }) => {
  const context = useStorageContext();

  if (context.authState === "ready") return children;

  if (context.storage.type === "google_drive") {
    return (
      <GoogleDriveAuth
        storage={context.storage}
        setGoogleDriveAccessToken={context.setGoogleDriveAccessToken}
      />
    );
  }

  if (context.storage.type === "local") {
    return <div />;
  }
};

const StorageProvider = ({
  children,
  context,
}: {
  children: React.ReactNode;
  context: StorageContextType;
}) => {
  return (
    <StorageContext.Provider value={context}>
      <StorageAuth>{children}</StorageAuth>
    </StorageContext.Provider>
  );
};

export default StorageProvider;
