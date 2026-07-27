**NovaShop Boutique de prêt-à-porter en ligne — vêtements et accessoires à l'africaine (abayas, boubous, robes, bijoux, etc.)**

---

## 📖 Description

NovaShop est une application e-commerce full-stack pensée pour la vente de vêtements et d'accessoires (mode africaine et prêt-à-porter). Le projet est composé de deux parties indépendantes :

- une **API REST en PHP natif** (sans framework) branchée sur une base **MySQL**, exposant les ressources produits, catégories, commandes, utilisateurs, avis, etc. ;
- une **interface cliente en React** (Vite) qui consomme cette API : catalogue, fiches produits, panier, authentification, avis clients et espace client.

## ✨ Fonctionnalités

- 🛍️ Catalogue de produits filtrable par catégorie, avec fiches détaillées
- 🛒 Panier d'achat et gestion des lignes de commande
- 👤 Authentification (inscription, connexion, déconnexion, session PHP)
- ⭐ Système d'avis clients (note + commentaire)
- 📦 Suivi des commandes et historique des mouvements de stock (côté API)
- 📊 Espace client (`Dashboard_client`) — un espace propriétaire est prévu mais pas encore activé
- 📱 Interface responsive, page "À propos"

## 🧱 Stack technique

| Côté                | Technologies                                              |
| ------------------- | --------------------------------------------------------- |
| **Frontend**        | React 19, Vite, React Router 7, Context API, Font Awesome |
| **Backend**         | PHP (natif, sans framework), PDO                          |
| **Base de données** | MySQL                                                     |

## 🗂️ Structure du projet

```
NovaShop/
├── public/
│   └── index.php            # Point d'entrée du backend
├── src/
│   ├── controllers/          # Endpoints API (un fichier = une ressource)
│   │   ├── acces.php                 # En-têtes CORS communs (require dans chaque contrôleur)
│   │   ├── api_produits.php          # GET/POST/PUT produits
│   │   ├── api_categories.php        # GET/POST/PUT catégories
│   │   ├── api_commande.php          # GET/POST commandes
│   │   ├── api_ligneCommande.php     # GET/POST lignes de commande
│   │   ├── api_imageProduit.php      # GET/POST images produits
│   │   ├── api_stockHistorique.php   # GET/POST historique de stock
│   │   ├── api_avis.php              # GET/POST avis
│   │   ├── api_users.php             # GET/POST utilisateurs
│   │   ├── user_login.php            # Connexion (session PHP)
│   │   ├── user_logout.php           # Déconnexion
│   │   └── est_connecter.php         # Vérifie l'état de la session
│   └── models/                # Requêtes SQL (PDO)
│       ├── Select.php / Insert.php / Update.php / Delete.php
│   └── view/                  # Application React (Vite)
│       └── src/
│           ├── composant/            # Produits, catégories, avis, détails produit...
│           ├── context/              # Auth, Panier, Commande, Produit, Localhost...
│           ├── includes/             # Header, Footer, Nav
│           ├── login/                # Login, Inscription, Logout
│           └── view/                 # Dashboard_client, Dashboard_proprietaire
└── .gitignore
```

> ⚠️ Chaque contrôleur PHP inclut `../../config/database.php`, qui doit exposer une connexion PDO dans `$pdo`. Ce fichier est volontairement ignoré par Git (dossier `config/`) car il contient les identifiants de connexion à la base — voir la section Installation.

## 🔌 API — aperçu des routes

Chaque endpoint agit comme un routeur simple basé sur `$_SERVER['REQUEST_METHOD']` (GET / POST / PUT / DELETE selon les ressources).

| Ressource           | Fichier                               | Méthodes       |
| ------------------- | ------------------------------------- | -------------- |
| Produits            | `controllers/api_produits.php`        | GET, POST, PUT |
| Catégories          | `controllers/api_categories.php`      | GET, POST, PUT |
| Images produits     | `controllers/api_imageProduit.php`    | GET, POST, PUT |
| Commandes           | `controllers/api_commande.php`        | GET, POST      |
| Lignes de commande  | `controllers/api_ligneCommande.php`   | GET, POST      |
| Historique de stock | `controllers/api_stockHistorique.php` | GET, POST, PUT |
| Avis                | `controllers/api_avis.php`            | GET, POST      |
| Utilisateurs        | `controllers/api_users.php`           | GET, POST      |
| Connexion           | `controllers/user_login.php`          | POST           |
| Déconnexion         | `controllers/user_logout.php`         | GET            |
| État de session     | `controllers/est_connecter.php`       | GET            |

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- PHP 8+ avec PDO (serveur type Apache/Nginx, ou `php -S`)
- MySQL

### 1. Cloner le dépôt

```bash
git clone https://github.com/MsaSid06/NovaShop.git
cd NovaShop
```

### 2. Configurer le backend

Créer le fichier `config/database.php` (à la racine du projet, ignoré par Git) qui initialise une connexion PDO dans une variable `$pdo`, par exemple :

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=novashop;charset=utf8mb4", "utilisateur", "mot_de_passe");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Importer ensuite le schéma correspondant aux tables utilisées par l'API (`Utilisateur`, `Categorie`, `Produit`, `ImageProduit`, `Commande`, `LigneCommande`, `StockHistorique`, `Avis`) dans votre base MySQL.

Servir ensuite `src/controllers/` avec votre serveur PHP, par exemple :

```bash
php -S 0.0.0.0:8000 -t src/controllers
```

### 3. Configurer le frontend

Dans `src/view/src/context/Localhost.jsx`, renseigner l'adresse IP ou le nom d'hôte de votre backend PHP :

```js
const localhost = "votre-ip-ou-domaine";
```

Puis installer et lancer l'application :

```bash
cd src/view
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou l'adresse affichée par Vite).

## 🗺️ Roadmap

- [ ] Activer l'espace propriétaire (`Dashboard_proprietaire`, actuellement commenté dans `App.jsx`)
- [ ] Externaliser la configuration de l'hôte API (variables d'environnement plutôt qu'IP en dur)
- [ ] Gestion des rôles côté frontend (client / propriétaire)

## 👤 Auteur

Développé par **Moussa Sidime** ([@MsaSid06](https://github.com/MsaSid06)) dans le cadre d'un projet personnel — L2 Génie Logiciel et Systèmes d'Information, ESP Dakar (UCAD).
