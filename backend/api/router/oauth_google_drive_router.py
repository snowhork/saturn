from fastapi import APIRouter

from api.service.oauth import OAuthToken
from api.storage.storage import GoogleDriveStorage, get_storage

oauth_google_drive_router = APIRouter()


@oauth_google_drive_router.get("/oauth/{name}/google_drive/auth")
def auth(name: str) -> str:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    return storage.google_drive_oauth().auth_url("auth/callback/google")


@oauth_google_drive_router.get("/oauth/{name}/google_drive/token")
def token(name: str, code: str) -> OAuthToken:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    token = storage.google_drive_oauth().fetch_token("auth/callback/google", code)

    return token
