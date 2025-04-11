# TP DevOps - TODO API

## Description
Ce projet consiste en une API REST de gestion de tâches (TODO list) développée avec **Node.js** et **Express**. L'API permet de récupérer, ajouter et supprimer des tâches dans une liste de TODO.

## Fonctionnalités
- Récupérer toutes les tâches
- Ajouter une nouvelle tâche
- Supprimer une tâche
- Gérer les erreurs liées aux requêtes

## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Docker](https://www.docker.com/)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/kawtarTL/tp-devops-todo-api.git

## CI/CD avec GitHub Actions

Ce projet utilise **GitHub Actions** pour automatiser le processus d'intégration continue (CI) et de déploiement continu (CD). Le fichier de configuration de la pipeline CI/CD est situé dans `.github/workflows/ci.yml`.

### Explication du fichier `ci.yml`

Le fichier `ci.yml` définit les étapes d'une pipeline CI/CD pour ce projet. Voici les différentes étapes expliquées :

1. **Déclenchement de la pipeline** :
   La pipeline se déclenche à chaque fois qu'il y a un `push` sur la branche `main`
2. **Construction de l'application** :
   Le code source du dépôt est récupéré avec actions/checkout@v2
   La version 16 de Node.js est installée avec actions/setup-node@v2
   Les dépendances sont installées avec npm install
   Les tests unitaires sont exécutés avec npm test (todo.test.js)
   Un linter est exécuté pour s'assurer que le code respecte les bonnes pratiques avec npm run lint
3. **Déploiement de l'application** :
   Le code source est récupéré de nouveau avec actions/checkout@v2
   Un tag Git est créé pour marquer la version de l'application à déployer, basé sur le numéro d'exécution de la pipeline
   L'application est déployée dans un conteneur Docker.

### Explication du fichier `Dockerfile`

FROM node:16 : Utilise l'image officielle de Node.js version 16 comme base pour l'application.

WORKDIR /usr/src/app : Définit le répertoire de travail dans le conteneur.

COPY package.json ./* : Copie les fichiers package.json et package-lock.json dans le conteneur.

RUN npm install : Installe les dépendances définies dans package.json.

COPY . . : Copie tous les fichiers de l'application dans le conteneur.

EXPOSE 3000 : Expose le port 3000 pour l'application.

CMD ["npm", "start"] : Démarre l'application avec la commande npm start lorsque le conteneur est lancé

### Explication du fichier `docker-compose.yml`

version: '3' : Définit la version de la syntaxe utilisée pour le fichier de configuration.

services : Déclare les services à utiliser dans l'application.

app : Service qui construit et lance l'application.

build: . : Spécifie que l'image Docker sera construite à partir du répertoire actuel.

ports: - "3000:3000" : Mappe le port 3000 du conteneur au port 3000 de la machine hôte pour l'accès à l'application.