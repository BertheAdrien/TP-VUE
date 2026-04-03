# Étape build
FROM node:20 AS build
WORKDIR /app

# Installation de pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
COPY .env .env
RUN pnpm run build

# Étape nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# config nginx SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf