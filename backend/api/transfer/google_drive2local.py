import os
from pathlib import Path
from api.storage.storage import (
    GoogleDriveStorage,
    LocalStorage,
    StorageCredentials,
)
from pydantic import BaseModel


class _ItemPath(BaseModel):
    item: GoogleDriveStorage.GoogleDriveService.GoogleDriveItem
    dst_dir_path: Path


def _handle_item(service: GoogleDriveStorage.GoogleDriveService, root_item: _ItemPath):
    item_paths: list[_ItemPath] = [root_item]

    while item_paths:
        item_path = item_paths.pop()
        print(f"handling {item_path}")

        if item_path.item.is_dir:
            folder_path = item_path.dst_dir_path.joinpath(item_path.item.name)
            os.makedirs(folder_path, exist_ok=True)

            drive_items = service.list_items(item_path.item.id)

            for item in drive_items:
                item_paths.append(_ItemPath(item=item, dst_dir_path=folder_path))

            continue

        if item_path.item.mime_type.startswith("application/vnd.google-apps"):
            # skip google docs
            continue

        target_path = item_path.dst_dir_path.joinpath(item_path.item.name)
        service.download(item_path.item.id, target_path)


def transfer_google_drive_to_local(
    src: GoogleDriveStorage,
    src_credentials: StorageCredentials,
    dst: LocalStorage,
    dst_credentials: StorageCredentials,
    src_ids: list[str],
    dst_id: str,
) -> None:
    service = src.google_drive_service(src_credentials)
    dst_root_path = dst.local_path(dst_id)

    for src_id in src_ids:
        _handle_item(
            service,
            _ItemPath(item=service.get_item(src_id), dst_dir_path=dst_root_path),
        )
