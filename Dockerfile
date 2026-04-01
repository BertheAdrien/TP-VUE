# Dockerfile
FROM nginx:alpine

# Copier le dossier dist généré
COPY dist/ /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en foreground
CMD ["nginx", "-g", "daemon off;"]