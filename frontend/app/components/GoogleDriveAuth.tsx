import { useEffect, useState } from "react";
import {
  useAuthApiOauthNameGoogleDriveAuthGet,
  useTokenApiOauthNameGoogleDriveTokenGet,
} from "../gen/default/default";
import { useStorageContext } from "./StorageProvider";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "../gen/schema";

const useSetGoogleDriveAuthToken = (name: string, uid: string) => {
  const context = useStorageContext();

  const { data } = useTokenApiOauthNameGoogleDriveTokenGet(name, { uid });

  useEffect(() => {
    if (!data) return;
    context.setGoogleDriveOauthToken(data.data);
  }, [data, context]);
};

const GoogleDriveAuth = ({ storage }: { storage: Storage }) => {
  const [uid] = useState<string>(uuidv4());

  const { data } = useAuthApiOauthNameGoogleDriveAuthGet(storage.name);

  useSetGoogleDriveAuthToken(storage.name, uid);

  if (!data) return <div>loading...</div>;

  return (
    <div className="mt-4">
      <a
        className="button text-white bg-blue-600 px-4 py-2 rounded font-bold"
        href={data.data}
        target="_blank"
        rel="noreferrer"
      >
        Google Login
      </a>
    </div>
  );
};

export default GoogleDriveAuth;
