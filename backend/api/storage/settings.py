from pydantic import Field
from pydantic_settings import BaseSettings


class LocalStorageSettings(BaseSettings):
    local_storage_name: str = "Local"
    local_storage_target_path: str = Field(...)


class GoogleDriveStorageSettings(BaseSettings):
    google_drive_storage_name: str = "GoogleDrive"
    google_drive_storage_root_folder_id: str = Field(...)

    google_drive_storage_oauth_client_id: str = Field(...)
    google_drive_storage_oauth_client_secret: str = Field(...)
    google_drive_storage_oauth_redirect_uri: str = "http://localhost:8000"
