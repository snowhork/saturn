from api.storage.settings import GoogleDriveStorageSettings
from pydantic import BaseModel
from requests_oauthlib import OAuth2Session


class OAuthToken(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    scope: list[str]


class OAuthGoogleDrive:
    def __init__(self, settings: GoogleDriveStorageSettings):
        self.client_id = settings.google_drive_storage_oauth_client_id
        self.client_secret = settings.google_drive_storage_oauth_client_secret
        self.redirect_uri = settings.google_drive_storage_oauth_redirect_uri
        self.authorization_base_url = "https://accounts.google.com/o/oauth2/auth"
        self.scope = [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/drive.appdata",
            "https://www.googleapis.com/auth/drive.metadata.readonly",
        ]
        self.token_url = "https://accounts.google.com/o/oauth2/token"

    def auth_url(self, path: str):
        oauth = OAuth2Session(
            self.client_id,
            redirect_uri=f"{self.redirect_uri}/{path}",
            scope=self.scope,
        )

        auth_url, state = oauth.authorization_url(self.authorization_base_url)

        return auth_url

    def fetch_token(self, path: str, code: str):
        oauth = OAuth2Session(
            self.client_id,
            redirect_uri=f"{self.redirect_uri}/{path}",
            scope=self.scope,
        )

        token = oauth.fetch_token(
            token_url=self.token_url, code=code, client_secret=self.client_secret
        )

        oauth_token = OAuthToken(**token)

        return oauth_token
