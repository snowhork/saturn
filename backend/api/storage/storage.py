import io
import os
from pathlib import Path
from typing import Literal, Optional
from api.storage.settings import GoogleDriveStorageSettings, LocalStorageSettings
from pydantic import BaseModel

from api.service.oauth import OAuthGoogleDrive

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build, Resource
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload

StorageType = Literal["google_drive", "local"]


class StorageCredentials(BaseModel):
    google_drive_token: Optional[str] = None
    ...


class Item(BaseModel):
    name: str
    id: str
    is_dir: bool


class Storage(BaseModel):
    name: str
    type: StorageType

    def __init__(self, **args):
        super().__init__(**args)

    def root(self, credentials: StorageCredentials) -> Item:
        raise NotImplementedError()

    def items(self, credentials: StorageCredentials, id: str) -> list[Item]:
        raise NotImplementedError()

    ...


class GoogleDriveStorage(Storage):
    type: StorageType = "google_drive"
    root_folder_id: str
    settings: GoogleDriveStorageSettings

    class GoogleDriveService:
        class GoogleDriveItem(Item):
            mime_type: str

        def __init__(self, service: Resource):
            self._service = service

        def get_item(self, id: str) -> GoogleDriveItem:
            item = (
                self._service.files()
                .get(fileId=id, fields="name, mimeType", supportsAllDrives=True)
                .execute()
            )

            return self.GoogleDriveItem(
                name=item["name"],
                id=id,
                mime_type=item["mimeType"],
                is_dir=item["mimeType"] == "application/vnd.google-apps.folder",
            )

        def list_items(self, id: str) -> list[GoogleDriveItem]:
            item_list = (
                self._service.files()
                .list(
                    q=f"'{id}' in parents and trashed=false",
                    supportsAllDrives=True,
                    includeItemsFromAllDrives=True,
                    pageSize=1000,
                )
                .execute()["files"]
            )

            return [
                self.GoogleDriveItem(
                    name=item["name"],
                    id=item["id"],
                    mime_type=item["mimeType"],
                    is_dir=item["mimeType"] == "application/vnd.google-apps.folder",
                )
                for item in item_list
            ]

        def download(self, file_id: str, target_path: Path):
            request = self._service.files().get_media(fileId=file_id)

            file = io.FileIO(target_path, mode="wb")
            downloader = MediaIoBaseDownload(file, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()

        def upload(self, file_path: Path, parent_folder_id: str):
            file_metadata = {
                "name": file_path.name,
                "parents": [parent_folder_id],
            }

            media = MediaFileUpload(str(file_path), resumable=True)
            file = (
                self._service.files()
                .create(
                    body=file_metadata,
                    media_body=media,
                    supportsAllDrives=True,
                    fields="id",
                )
                .execute()
            )
            return file["id"]

        def create_folder(self, parent_folder_id: str, new_folder_name: str):
            resp = (
                self._service.files()
                .create(
                    body={
                        "name": new_folder_name,
                        "mimeType": "application/vnd.google-apps.folder",
                        "parents": [parent_folder_id],
                    },
                    supportsAllDrives=True,
                )
                .execute()
            )

            return self.GoogleDriveItem(
                name=resp["name"],
                id=resp["id"],
                mime_type=resp["mimeType"],
                is_dir=True,
            )

    def __init__(self, settings: GoogleDriveStorageSettings):
        super().__init__(
            name=settings.google_drive_storage_name,
            root_folder_id=settings.google_drive_storage_root_folder_id,
            settings=settings,
        )
        self._oauth_google_drive = OAuthGoogleDrive(self.settings)

    def google_drive_service(
        self, credentials: StorageCredentials
    ) -> GoogleDriveService:
        creds = Credentials(credentials.google_drive_token)
        service = build("drive", "v3", credentials=creds)

        return self.GoogleDriveService(service)

    def root(self, credentials: StorageCredentials) -> Item:
        service = self.google_drive_service(credentials)
        return service.get_item(self.root_folder_id)

    def items(self, credentials: StorageCredentials, id: str) -> list[Item]:
        service = self.google_drive_service(credentials)
        return [Item(**item.model_dump()) for item in service.list_items(id)]

    def google_drive_oauth(self) -> OAuthGoogleDrive:
        return self._oauth_google_drive


class LocalStorage(Storage):
    type: StorageType = "local"
    settings: LocalStorageSettings
    target_path: Path

    def __init__(self, settings: LocalStorageSettings):
        super().__init__(
            name=settings.local_storage_name,
            target_path=Path(settings.local_storage_target_path),
            settings=settings,
        )

    def local_path(self, id: str) -> Path:
        return self.target_path.joinpath(id)

    def root(self, credentials: StorageCredentials) -> Item:
        return Item(name=str(self.target_path), id=".", is_dir=True)

    def get_item(self, id: str) -> Item:
        path = self.local_path(id)
        return Item(name=path.name, id=id, is_dir=os.path.isdir(path))

    def list_items(self, id: str) -> list[Item]:
        path = self.local_path(id)
        entries = os.listdir(path)
        items = []

        for entry in entries:
            items.append(
                Item(
                    name=entry,
                    id=str(Path(id).joinpath(entry)),
                    is_dir=os.path.isdir(path.joinpath(entry)),
                )
            )

        return items

    def items(self, credentials: StorageCredentials, id: str) -> list[Item]:
        return self.list_items(id)


__storage_list = [
    GoogleDriveStorage(
        settings=GoogleDriveStorageSettings(),  # type: ignore
    ),
    LocalStorage(
        settings=LocalStorageSettings(),  # type: ignore
    ),
]


def get_storage_list():
    return __storage_list


def get_storage(name: str) -> Storage:
    for storage in __storage_list:
        if storage.name == name:
            return storage
    raise ValueError(f"Storage {name} not found")
