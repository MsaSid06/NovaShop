<p align="center">
  <img src="src/view/public/NovaShop.png" alt="NovaShop" width="720">
</p>

<h1 align="center">NovaShop</h1>
<p align="center"><i>Boutique de prêt-à-porter en ligne — mode africaine et vêtements tendance (abayas, boubous, robes, bijoux, accessoires...)</i></p>

---

## 📖 Description

NovaShop est une application e-commerce full-stack pensée pour la vente de vêtements et d'accessoires (mode africaine et prêt-à-porter). Le projet est composé de deux parties indépendantes :

- une **API REST en PHP natif** (sans framework) branchée sur une base **MySQL**, exposant les ressources produits, catégories, commandes, utilisateurs, avis, images produits et historique de stock ;
- une **interface React** (Vite) qui consomme cette API, avec deux espaces distincts selon le rôle de l'utilisateur : un espace **client** (catalogue, panier, commandes, avis) et un espace **propriétaire** (tableau de bord d'administration).

## ✨ Fonctionnalités

### Espace client

- 🛍️ Catalogue de produits filtrable par catégorie, avec fiches détaillées
- 🛒 Panier d'achat et passage de commande
- 👤 Authentification (inscription, connexion, déconnexion en session PHP)
- ⭐ Avis clients (note + commentaire)
- 📱 Interface responsive, page "À propos"

### Espace propriétaire (`/proprio`, accès protégé par rôle)

- 📊 Tableau de bord statistiques (Chart.js), dont le revenu par catégorie
- 📦 Gestion des commandes (liste complète, commandes de la semaine)
- 🧥 Gestion des produits et catégories (CRUD complet, upload d'image)
- 👥 Gestion des clients et des avis (CRUD)
- 🧭 Sidebar rétractable ("Admin Panel")

## 🧱 Stack technique

| Côté                | Technologies                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Frontend**        | React 19, Vite, React Router 7, Context API (9 providers), Chart.js, Font Awesome             |
| **Backend**         | PHP natif (sans framework), PDO, sessions PHP                                                 |
| **Base de données** | MySQL                                                                                         |
| **Design**          | Système de variables CSS custom — fond navy `#0f172a` → `#1e293b`, accent bleu ciel `#38bdf8` |

## 🗂️ Structure du projet

```
NovaShop/
├── public/
│   └── index.php              # Présent mais actuellement vide (non utilisé)
├── src/
│   ├── controllers/            # Endpoints API (un fichier = une ressource)
│   │   ├── acces.php                 # En-têtes CORS communs (require dans chaque contrôleur)
│   │   ├── api_produits.php          # CRUD produits + upload d'image
│   │   ├── api_categories.php        # CRUD catégories
│   │   ├── api_imageProduit.php      # CRUD images produits
│   │   ├── api_commande.php          # CRUD commandes
│   │   ├── api_ligneCommande.php     # CRUD lignes de commande
│   │   ├── api_stockHistorique.php   # CRUD historique de stock
│   │   ├── api_avis.php              # CRUD avis
│   │   ├── api_users.php             # CRUD utilisateurs
│   │   ├── api_revenusCat.php        # Revenu par catégorie (lecture seule)
│   │   ├── user_login.php            # Connexion (session PHP)
│   │   ├── user_logout.php           # Déconnexion
│   │   ├── est_connecter.php         # Vérifie l'état de la session
│   │   ├── insert_users.php          # Script ponctuel de seed (jeu d'essai)
│   │   └── move_file.php             # Code désactivé (commenté), non utilisé
│   └── models/                 # Requêtes SQL (PDO)
│       └── Select.php / Insert.php / Update.php / Delete.php
├── src/view/                   # Application React (Vite)
│   └── src/
│       ├── composant/                # Produits, catégories, avis, tables d'admin...
│       ├── context/                  # Auth, Panier, Commande, Produit, Localhost...
│       ├── includes/                 # Header, Footer, Nav
│       ├── login/                    # Login, Inscription, Logout
│       └── view/                     # Dashboard_client, Dashboard_proprietaire
└── .gitignore
```

> ⚠️ Chaque contrôleur PHP inclut `../../config/database.php`, qui doit exposer une connexion PDO dans `$pdo`. Ce fichier est volontairement ignoré par Git (dossier `config/`) car il contient les identifiants de connexion — voir la section Installation.

## 🔌 API — aperçu des routes

Chaque endpoint agit comme un routeur simple basé sur `$_SERVER['REQUEST_METHOD']`. L'authentification repose sur les sessions PHP (`credentials: include` côté frontend).

| Ressource            | Fichier                               | Méthodes               |
| -------------------- | ------------------------------------- | ---------------------- |
| Produits             | `controllers/api_produits.php`        | GET, POST, PUT, DELETE |
| Catégories           | `controllers/api_categories.php`      | GET, POST, PUT, DELETE |
| Images produits      | `controllers/api_imageProduit.php`    | GET, POST, PUT, DELETE |
| Commandes            | `controllers/api_commande.php`        | GET, POST, PUT, DELETE |
| Lignes de commande   | `controllers/api_ligneCommande.php`   | GET, POST, PUT, DELETE |
| Historique de stock  | `controllers/api_stockHistorique.php` | GET, POST, PUT, DELETE |
| Avis                 | `controllers/api_avis.php`            | GET, POST, PUT, DELETE |
| Utilisateurs         | `controllers/api_users.php`           | GET, POST, PUT, DELETE |
| Revenu par catégorie | `controllers/api_revenusCat.php`      | GET                    |
| Connexion            | `controllers/user_login.php`          | POST                   |
| Déconnexion          | `controllers/user_logout.php`         | GET                    |
| État de session      | `controllers/est_connecter.php`       | GET                    |

## 🗄️ Modèle de données (aperçu)

D'après les requêtes du dossier `models/`, l'API s'appuie sur les tables suivantes : `Utilisateur`, `Categorie`, `Produit`, `Images_Produit`, `Commande`, `Ligne_Commande`, `Stock_Historiques`, `Avis`.

> ℹ️ Aucun fichier de migration/schéma SQL n'est actuellement versionné dans le dépôt — la base doit être recréée manuellement à partir de ces tables (voir Installation).

## 🚀 Installation

Le frontend appelle l'API sur des chemins en dur du type `http://<host>/Boutique/src/controllers/...`, et le backend écrit les images uploadées via `DOCUMENT_ROOT . "/Boutique/src/view/public/assets/Produits/..."`. **Le projet doit donc être servi via Apache (XAMPP/WAMP) depuis un dossier nommé exactement `Boutique`.**

### Prérequis

- XAMPP ou WAMP (Apache + PHP 8+ avec PDO + MySQL/MariaDB)
- Node.js 18+ et npm

### 1. Cloner le dépôt dans le dossier `Boutique`

```bash
# Exemple XAMPP (Windows)
git clone https://github.com/MsaSid06/NovaShop.git C:/xampp/htdocs/Boutique

# Exemple XAMPP (Linux/macOS)
git clone https://github.com/MsaSid06/NovaShop.git /opt/lampp/htdocs/Boutique
```

Démarrer ensuite **Apache** et **MySQL** depuis le panneau de contrôle XAMPP/WAMP.

### 2. Configurer le backend

Créer le fichier `config/database.php` (à la racine du projet, ignoré par Git) qui initialise une connexion PDO dans une variable `$pdo` :

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=novashop;charset=utf8mb4", "utilisateur", "mot_de_passe");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Créer la base MySQL `novashop` et ses tables (`Utilisateur`, `Categorie`, `Produit`, `Images_Produit`, `Commande`, `Ligne_Commande`, `Stock_Historiques`, `Avis`) correspondant aux champs utilisés dans `src/models/`.

L'API est alors accessible sur `http://localhost/Boutique/src/controllers/` (ex. `http://localhost/Boutique/src/controllers/api_produits.php`).

### 3. Configurer le frontend

Dans `src/view/src/context/Localhost.jsx`, renseigner l'hôte de votre backend (adresse IP locale ou `localhost`) :

```js
const localhost = "localhost"; // ou votre IP locale, ex. 192.168.1.10
```

Puis installer et lancer l'application :

```bash
cd src/view
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou l'adresse affichée par Vite).

## ⚠️ Points d'attention connus

- Le flux de connexion (`Login.jsx`) redirige un rôle `admin` vers `/admin`, mais **aucune route `/admin` n'est définie** dans `App.jsx` (seules `/client` et `/proprio` existent actuellement).
- L'hôte de l'API est actuellement codé en dur dans `Localhost.jsx` plutôt que géré via une variable d'environnement.
- `public/index.php` est présent mais vide ; il n'est pas utilisé comme point d'entrée réel (chaque contrôleur de `src/controllers/` est appelé directement).
- `move_file.php` contient une logique d'upload désactivée (commentée en HTML) ; l'upload d'image réel se fait directement dans `api_produits.php`.
- `insert_users.php` (script de seed) contient encore des marqueurs de conflit Git non résolus, à nettoyer.

## 🗺️ Roadmap

- [ ] Ajouter la route `/admin` ou clarifier l'usage du rôle `admin`
- [ ] Externaliser la configuration de l'hôte API (variables d'environnement plutôt qu'IP en dur)
- [ ] Versionner un schéma SQL (`.sql`) pour faciliter l'installation
- [ ] Nettoyer `insert_users.php` et retirer/finaliser `move_file.php`

## 📄 Licence

Projet personnel — tous droits réservés. Aucune licence open-source n'est appliquée pour le moment.

## 👤 Auteur

Développé par **Moussa Sidime** ([@MsaSid06](https://github.com/MsaSid06)) dans le cadre d'un projet personnel — L2 Génie Logiciel et Systèmes d'Information, ESP Dakar (UCAD).
