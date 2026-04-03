# 🚀 TP Vue.js - Interface administrateur

## 📋 Description

Application web moderne de gestion d'utilisateurs et de groupes construite avec Vue 3, utilisant des composants shadcn-vue et déployée en production avec Docker.

---

## 🏗️ Architecture Technique

### Frontend (Vue 3)
- **Framework** : Vue 3 + Composition API
- **Routing** : Vue Router 5
- **UI Components** : shadcn-vue + Tailwind CSS
- **Build Tool** : Vite
- **Package Manager** : pnpm

### Backend (Node.js)
- **Runtime** : Node.js 20
- **Framework** : Express.js
- **Data** : Fichier JSON statique (`users.json`)

### Infrastructure
- **Containerisation** : Docker (frontend + backend)
- **Reverse Proxy** : Nginx
- **Déploiement** : VPS avec GitHub Actions
- **URL Production** : `http://tp-vuejs.bertadrien.fr/`

---

## Présentation du site 

Le site présente une interface de gestion d'utilisateurs et de groupes. Il est tiré de la future interface administrateur du projet MDP GavaLab. Un layout a été mis en place avec la topbar et la sidebar. La sidebar prend le rôle de la navbar (pour le TP), les bodys de mettent a jour sans rafraichir entierement la page.

### Vue User Management 

Cette vue représente une interface de gestion des utilisateurs. Elle permet de visualiser la liste des utilisateurs, de les filtrer par groupe, de les rechercher par nom ou email. Les utilisateurs sont chargés depuis un fichier JSON statique via une API Express qui se trouve dans le dossier `backend`. Il y a seulement le GET qui est implémenté pour le moment.

### Vue Group Management 

Cette vue représente une interface de gestion des groupes. Elle est seulement la de manière décorative pour le TP. Elle a été entièrement réalisée avec des composants shadcn-vue. 

---

## 📦 Installation

### Prérequis
- Node.js 18+
- pnpm
- Docker (pour le déploiement)

### Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

### Backend
```bash
cd backend
pnpm install
pnpm run dev
```

---

## tests

### tests frontend

Les tests frontend sont réalisés avec Vitest. Ils sont situés dans le fichier `frontend.test.js`. Ils sont nottement solicités lors du déploiement pour vérifier que l'application fonctionne correctement.

---

## Déploiement de l'application

Le projet utilise **Docker** et une **pipeline CI/CD** pour automatiser le déploiement.  

- **docker-compose.yml** : déploie l’application (frontend et backend) en production.  
- **Dockerfile** : un pour le frontend, un pour le backend.  
- **tests.yml** : exécute les tests avant le déploiement ; si un test échoue, le déploiement est annulé.  
- **GitHub Actions** : orchestre les étapes de tests et de déploiement.  

## Déploiement en production

La pipeline met à jour le VPS et démarre l’application :  

```bash
git pull
docker compose up -d

```

## Problématiques rencontrées.

J'ai eu de nombreux problèmes durant ces 3 jours de TP. Essentiellement liés à la configuration de Docker et de GitHub Actions. Nottemment avec les clés ssh et les permissions sur le VPS. J'ai mis beaucoup de temps à essayer de configurer la connexion ssh à un repository privé. 
Ensuite j'ai mis aussi beaucoup de temps pour relier le backend au frontend via l'API en production car mon fichier .env ne se buildait pas correctement lorsque je montais le conteneur. 
Shadcn-vue a aussi été un peu compliqué à configurer principalement a cause de tailwindcss.



## Axes d'amélioration.

Durant ce TP, j'aurais du dans un tout premier temps bien séparer dans deux dossiers le frontend et le backend. Cela aurait permis de mieux organiser le projet et de faciliter la maintenance et le déploiement. 
J'aurais aimé aussi mettre en place une base de données pour stocker les données de l'application et implémenter les API pour gérer les POST/PUT/DELETE. 
A teme dans le projet, j'aurais aimé intégrer les composants shadcn-vue de manière plus complète et cohérente nottemment avec l'interface UserManagement.

