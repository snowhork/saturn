from fastapi import APIRouter, HTTPException

from api.service.oauth import OAuthToken
from api.storage.storage import GoogleDriveStorage, get_storage

oauth_google_drive_router = APIRouter()


@oauth_google_drive_router.get("/oauth/{name}/google_drive/auth")
def auth(name: str, uid: str) -> str:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    return storage.google_drive_oauth().auth(f"oauth/{name}/google_drive/callback", uid)


@oauth_google_drive_router.get("/oauth/{name}/google_drive/callback")
def callback(name: str, code: str, uid: str) -> str:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    storage.google_drive_oauth().fetch_token(
        f"oauth/{name}/google_drive/callback", uid, code
    )

    return "OK, please close this window."


# this is ad-hoc endpoint to get token by uid.
# Don't use this pattern in production.
@oauth_google_drive_router.get("/oauth/{name}/google_drive/token")
def token(name: str, uid: str) -> OAuthToken:
    storage = get_storage(name)
    assert isinstance(storage, GoogleDriveStorage), "GoogleDriveStorage only"

    token = storage.google_drive_oauth().get_token_by_uid(uid)

    if token is None:
        raise HTTPException(status_code=404, detail="Token not found")

    return token
