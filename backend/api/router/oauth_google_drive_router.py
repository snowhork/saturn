from fastapi import APIRouter

from api.service.oauth import OAuthToken
from api.storage.storage import GoogleDriveStorage, get_storage

oauth_google_drive_router = APIRouter()


@oauth_google_drive_router.get("/oauth/{name}/google_drive/auth")
def auth(name: str) -> str:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    return storage.google_drive_oauth().auth_url(name, "auth/callback/google")


@oauth_google_drive_router.post("/oauth/{name}/google_drive/token")
def token(name: str, code: str) -> OAuthToken:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    token = storage.google_drive_oauth().fetch_token(name, "auth/callback/google", code)

    return token


@oauth_google_drive_router.post("/oauth/{name}/google_drive/refresh")
def refresh(name: str, refresh_token: str) -> OAuthToken:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    token = storage.google_drive_oauth().refresh_token(
        name, "auth/callback/google", refresh_token
    )

    return token
