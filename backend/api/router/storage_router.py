from typing import Optional
from api.transfer.google_drive2local import transfer_google_drive_to_local
from api.transfer.local2google_drive import transfer_local_to_google_drive
from fastapi import APIRouter, Depends

from api.storage.storage import (
    GoogleDriveStorage,
    Item,
    LocalStorage,
    Storage,
    StorageCredentials,
    get_storage,
    get_storage_list,
)
from pydantic import BaseModel

storage_router = APIRouter()


@storage_router.get("/storages")
def _list() -> list[Storage]:
    storages = get_storage_list()
    return storages


def _parse_credentials(
    google_drive_token: Optional[str] = None,
) -> StorageCredentials:
    return StorageCredentials(google_drive_token=google_drive_token)


@storage_router.get("/root")
def _root_dir(
    name: str, credentials: StorageCredentials = Depends(_parse_credentials)
) -> Item:
    storage = get_storage(name)
    return storage.root(credentials)


@storage_router.get("/items")
def _list_items(
    name: str,
    id: str,
    credentials: StorageCredentials = Depends(_parse_credentials),
) -> list[Item]:
    storage = get_storage(name)
    return storage.items(credentials, id)


class CredentialsRequest(BaseModel):
    google_drive_token: Optional[str] = None

    def to_storage_credentials(self) -> StorageCredentials:
        return StorageCredentials(google_drive_token=self.google_drive_token)


class TransferRequest(BaseModel):
    src_name: str
    src_ids: list[str]
    dst_name: str
    dst_id: str

    src_credentials: CredentialsRequest
    dst_credentials: CredentialsRequest


def _parse_credential_body(
    creds: Optional[CredentialsRequest],
) -> StorageCredentials:
    if creds is None:
        return StorageCredentials()
    return StorageCredentials(google_drive_token=creds.google_drive_token)


@storage_router.post("/transfer")
def _transfer(
    req: TransferRequest,
) -> str:
    src = get_storage(req.src_name)
    dst = get_storage(req.dst_name)

    src_credentials = req.src_credentials.to_storage_credentials()
    dst_credentials = req.dst_credentials.to_storage_credentials()

    # assert isinstance(src, GoogleDriveStorage), "src must be GoogleDriveStorage"
    # assert isinstance(dst, LocalStorage), "dst must be LocalStorage"

    if isinstance(src, GoogleDriveStorage) and isinstance(dst, LocalStorage):
        transfer_google_drive_to_local(
            src, src_credentials, dst, dst_credentials, req.src_ids, req.dst_id
        )
    elif isinstance(src, LocalStorage) and isinstance(dst, GoogleDriveStorage):
        transfer_local_to_google_drive(
            src, src_credentials, dst, dst_credentials, req.src_ids, req.dst_id
        )

    return "ok"
