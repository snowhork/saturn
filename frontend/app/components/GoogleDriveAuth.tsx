import { useEffect, useState } from "react";
import {
  useAuthApiOauthNameGoogleDriveAuthGet,
  // useTokenApiOauthNameGoogleDriveTokenGet,
} from "../gen/default/default";
import { useStorageContext } from "./StorageProvider";
import { v4 as uuidv4 } from "uuid";
import { OAuthToken, Storage } from "../gen/schema";

const localStorageKey = (name: string) => `google_drive_token_${name}`;

type LocalSavedToken = {
  access_token: string;
  expires_at: number;
  refresh_token: string;
};

export const setGoogleDriveLocalStorage = (name: string, token: OAuthToken) => {
  const savedToken: LocalSavedToken = {
    access_token: token.access_token,
    expires_at: Date.now() + token.expires_in * 1000,
    refresh_token: token.refresh_token,
  };
  localStorage.setItem(localStorageKey(name), JSON.stringify(savedToken));
};

const getGoogleDriveLocalStorage = (name: string): LocalSavedToken | null => {
  const token = localStorage.getItem(localStorageKey(name));
  if (!token) return null;
  return JSON.parse(token);
};

const GoogleDriveAuth = ({
  storage,
  setGoogleDriveAccessToken,
}: {
  storage: Storage;
  setGoogleDriveAccessToken: (token: string) => void;
}) => {
  const { data } = useAuthApiOauthNameGoogleDriveAuthGet(storage.name);

  const token = getGoogleDriveLocalStorage(storage.name);

  useEffect(() => {
    if (token) {
      if (Date.now() < token.expires_at) {
        setGoogleDriveAccessToken(token.access_token);
      } else {
        // TODO: refresh token
      }
    }
  }, [token, setGoogleDriveAccessToken]);

  if (!data) return <div>loading...</div>;

  return (
    <div className="mt-4">
      <a
        className="button text-white bg-blue-600 px-4 py-2 rounded font-bold"
        href={data.data}
        rel="noreferrer"
      >
        Google Login
      </a>
    </div>
  );
};

export default GoogleDriveAuth;
