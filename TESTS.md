# Tests et CI/CD

## 🧪 Tests Unitaires

### Backend (Node.js + Express)

Les tests du backend utilisent **Jest** et **Supertest** :

```bash
cd backend
npm install
npm test                # Lancer tous les tests
npm run test:watch     # Mode watch
npm run test:coverage  # Avec coverage
```

**Tests couverts :**
- ✅ GET `/users` - Retourne la liste des utilisateurs
- ✅ GET `/users/:id` - Retourne un utilisateur spécifique
- ✅ Gestion des erreurs (404, 500)
- ✅ Headers CORS
- ✅ Validation des données

### Frontend (Vue 3)

Les tests du frontend utilisent **Vitest** et **Vue Test Utils** :

```bash
npm run test:unit           # Lancer tous les tests
npm run test:unit:watch     # Mode watch
npm run test:unit:coverage  # Avec coverage
```

**Tests couverts :**
- ✅ Composants Vue (UserTable, UserManagement, GroupManagement, AppLayout)
- ✅ Rendu des composants
- ✅ Intégration avec Vue Router
- ✅ Appels API (mockés)
- ✅ Filtrage et tri des données
- ✅ Gestion des erreurs

## 🚀 CI/CD Pipeline

### Workflow GitHub Actions

Le pipeline se déclenche sur :
- `push` sur les branches `main` et `develop`
- `pull request` sur `main`

### Jobs

1. **test-backend** : Tests unitaires API
2. **test-frontend** : Tests unitaires Vue + build
3. **integration-tests** : Tests d'intégration API/Frontend
4. **security-scan** : Scan de vulnérabilités (Trivy)
5. **deploy-staging** : Déploiement sur staging (branch `develop`)
6. **deploy-production** : Déploiement sur production (branch `main`)
7. **notify** : Notifications Slack

### Déploiement

**Staging** (`develop`) :
- Tests automatiques
- Déploiement sur environnement de staging
- Smoke tests

**Production** (`main`) :
- Tous les tests doivent passer
- Scan de sécurité
- Déploiement sur VPS (`193.70.113.80`)
- Vérification de production

## 📊 Coverage

Les rapports de coverage sont générés pour :
- Backend : Couverture du code API
- Frontend : Couverture des composants Vue

Upload sur Codecov pour visualisation.

## 🔧 Configuration

### Backend Tests
- **Framework** : Jest
- **HTTP Testing** : Supertest
- **Environment** : Node.js

### Frontend Tests
- **Framework** : Vitest
- **Vue Testing** : Vue Test Utils
- **Environment** : jsdom
- **Mocks** : fetch API, localStorage, router

### Variables d'environnement
```bash
# Production
VITE_API_URL=http://193.70.113.80:3000

# Local
VITE_API_URL=http://localhost:3000
```

## 🛠️ Lancer les tests localement

### Prérequis
```bash
# Backend
cd backend && npm install

# Frontend  
npm install
```

### Commands
```bash
# Tests backend
npm run test

# Tests frontend
npm run test:unit

# Tous les tests
npm run test:all

# Coverage
npm run test:unit:coverage
```

## 📝 Structure des tests

```
backend/
├── tests/
│   └── api.test.js          # Tests API
└── package.json             # Dépendances test

src/
├── components/
│   └── __tests__/
│       └── UserTable.test.js
├── views/
│   └── __tests__/
│       ├── UserManagement.test.js
│       └── GroupManagement.test.js
├── layouts/
│   └── __tests__/
│       └── AppLayout.test.js
└── test/
    └── setup.js             # Configuration globale
```

## 🚨 Déploiement automatique

Le déploiement se fait automatiquement via GitHub Actions :

1. **Tests passent** ✅
2. **Build réussi** ✅  
3. **Sécurité validée** ✅
4. **Déploiement sur VPS** 🚀
5. **Vérification production** ✅

En cas d'échec, le pipeline s'arrête et une notification est envoyée.
