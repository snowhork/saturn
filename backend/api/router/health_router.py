from typing import Literal

from fastapi import APIRouter

health_router = APIRouter()


@health_router.get(
    "/health", description="ヘルスチェック", response_model=Literal["ok"]
)
def health():
    return "ok"
