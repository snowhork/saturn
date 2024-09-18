from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router.health_router import health_router
from api.router.storage_router import storage_router
from api.router.oauth_google_drive_router import oauth_google_drive_router
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Query API", version="0.1.0")


app.mount("/assets", StaticFiles(directory="dist/assets/"), name="dist")

app.include_router(health_router, prefix="/api")
app.include_router(storage_router, prefix="/api")
app.include_router(oauth_google_drive_router, prefix="/api")

@app.get("/{path_name:path}")
async def catch_all(path_name: str):
    return FileResponse("./dist/index.html", media_type="text/html")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)
