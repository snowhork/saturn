from api.storage.storage import (
    GoogleDriveStorage,
    Item,
    LocalStorage,
    StorageCredentials,
)
from pydantic import BaseModel


class _ItemPath(BaseModel):
    item: Item
    dst_dir_id: str


def _handle_item(
    src: LocalStorage,
    service: GoogleDriveStorage.GoogleDriveService,
    root_item_path: _ItemPath,
) -> None:
    item_paths: list[_ItemPath] = [root_item_path]

    while item_paths:
        item_path = item_paths.pop()
        print(f"handling {item_path}")

        if item_path.item.is_dir:
            new_dir = service.create_folder(item_path.dst_dir_id, item_path.item.name)
            for child in src.list_items(item_path.item.id):
                item_paths.append(_ItemPath(item=child, dst_dir_id=new_dir.id))
            continue

        service.upload(src.local_path(item_path.item.id), item_path.dst_dir_id)


def transfer_local_to_google_drive(
    src: LocalStorage,
    src_credentials: StorageCredentials,
    dst: GoogleDriveStorage,
    dst_credentials: StorageCredentials,
    src_ids: list[str],
    dst_id: str,
) -> None:
    service = dst.google_drive_service(dst_credentials)

    for src_id in src_ids:
        _handle_item(
            src,
            service,
            _ItemPath(item=src.get_item(src_id), dst_dir_id=dst_id),
        )

    ...
