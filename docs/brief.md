# PremiÃ¨re semaine - Les bases du back

## Setup Machine

- DÃ©couverte de Markdown
  - prise de notes obligatoire
  - Les tips de la veille :
    - techno + awesome
    - techno + cheatsheet
- Unix (Linux / MacOS / WSL)
  - WSL2 pour Windows (activer la vitualisation Hyper-V et si besoin dans le BIOS)
  - Installer Ubuntu en LTS
  - git est installÃ© par dÃ©faut
- CrÃ©er un compte Github
  - CrÃ©er et lier une clÃ© SSH 
  - https://docs.github.com/fr/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
  - https://docs.github.com/fr/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
- Les bases de la ligne de commande
  - navigation dans les dossiers => aller dans votre rÃ©pertoire home (~)
  - crÃ©er un dossier `dev`
- installer nvm
  - dÃ©sinstaller nodejs si dÃ©jÃ  installÃ©
  - installer nvm via le script d'installation
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```
  - lister les versions de nodejs disponibles et installer la derniÃ¨re LTS
  ```bash
  nvm ls-remote
  nvm install <version>
  nvm use <version>
  ```
  - vÃ©rifier l'installation
  ```bash
  node -v
  ```

## Projet de cette semaine

ThÃ¨me : la cuisine ! Nous allons nous crÃ©er notre propre API de recettes de cuisine en utilisant toute la connaissance de Marmiton (pas bien ...).

Nous dÃ©couvrirons ou stabiliserons la connaissance sur :
- les bases des bases de donnÃ©es relationnelles (schema et requÃªtes SQL simples)
- l'utilisation d'un headless CMS
- l'utilisation d'une API RESTful propre
- les bases avec nodejs
- les API Rest avec expressjs
- le versionning avec git et github
- les bases du devops avec docker
- les bases de la CI/CD avec github actions et Render
- le scraping avec puppeteer

### DÃ©finition du projet

L'objectif est de crÃ©er une API Restful qui permettra de rÃ©aliser des opÃ©rations CRUD (Create, Read, Update, Delete) sur des recettes de cuisine.
La base de donnÃ©es n'aura pas de relations. Une table utilisateurs permettra de gÃ©rer la sÃ©curisation de notre API. Et une table recette permettra de stocker les recettes.
Les recettes viendront d'un site de cuisine Ã  la mano ou via du scraping.

### Etapes Ã  rÃ©aliser

#### Strapi

1. CrÃ©er un nouveau Strapi project
2. CrÃ©er la collection "recettes" avec les champs suivants :
  - titre (string)
  - temps de prÃ©paration (integer)
  - difficultÃ© (integer)
  - budget (integer)
  - description (text)
3. RÃ©cupÃ©rer des recettes Ã  la main sur Marmiton ou autre site de cuisine
Je vous conseille :
https://encuisine.adrienrossignol.fr/recette/45
Les recettes vont de 1 Ã  45.
4. Ajouter les recettes dans Strapi avec l'extension Rest client de VSCode
https://marketplace.visualstudio.com/items?itemName=humao.rest-client
5. SÃ©curiser l'API avec JWT
6. Ajouter la documentation Swagger avec le plugin Documentation
7. Bonus : Utiliser l'extension GraphQL pour tester les requÃªtes GraphQL
8. Bonus pour ceux en avance : faire du scraping avec puppeteer pour ajouter les recettes automatiquement

#### Express avec NodeJS

0. Suivre le cours sur nodejs et express
0. Suivre l'introduction aux bases de donnÃ©es relationnelles
0. S'entrainer aux requÃªtes SQL simples avec SQL Zoo
1. CrÃ©er un nouveau projet nodejs avec express
```
npm init -y
npm install express
```
2. Changer le package.json pour ajouter "type": "module"
3. CrÃ©er un serveur express basique
4. CrÃ©er une base de donnÃ©es avec sqlite3 et sqlite en dÃ©pendances
```bash
npm install sqlite3 sqlite
```
5. Ouvrir la base de donnÃ©es avec https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer
6. CrÃ©er la table utilisateurs
7. CrÃ©er la table recettes
8. CrÃ©er les routes CRUD pour les recettes
9. Suivre le cours sur l'authentification avec JWT
10. Ajouter l'authentification Ã  l'API en respectant les mÃªme pratiques et routes que Strapi
11. Suivre le cours sur les bases de donnÃ©es relationnelles
12. Ajouter les ingrÃ©dients dans strapi
13. Ajouter les ingrÃ©dients dans sqlite
14. Ajouter la gestion des ingrÃ©dients dans l'API