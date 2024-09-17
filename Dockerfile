FROM node:20-alpine as build-stage

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm i

COPY frontend ./
RUN npm run build

FROM python:3.11-slim as serve-stage

WORKDIR /app

COPY backend/README.md backend/pyproject.toml backend/requirements.lock ./
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r requirements.lock

COPY backend ./
COPY --from=build-stage /app/build/client /app/dist

CMD ["python", "main.py"]
