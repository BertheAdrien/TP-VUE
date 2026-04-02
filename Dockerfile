# Étape build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# config nginx SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf