<?php

require_once "./acces.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
<<<<<<< HEAD
    http_response_code(200);
    exit();
=======
  http_response_code(200);
  exit();
>>>>>>> master
}


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
<<<<<<< HEAD
    case 'GET':
        require_once "../models/Select.php";
        $produits = getProduit();
        echo  $produits ? json_encode($produits) : json_encode(["message" => "Aucun produit trouvé"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_categorie = (int) ($data['id_categorie'] ?? null);
        $nom_produit = $data['nom_produit'] ?? null;
        $prix = (float) ($data['prix'] ?? null);
        $stock_actuel = (int) ($data['stock_actuel'] ?? null);
        $statut = $data['statut'] ?? 'actif';
        $description = $data['description'] ?? null;

        echo  insertProduit($id_categorie, $nom_produit, $prix, $stock_actuel, $statut, $description) ? json_encode(["message" => "Produit ajouté avec succès"]) : json_encode(["message" => "Erreur, produit non ajouté"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_produit = (int) $data['id_produit'] ?? null;
        $id_categorie = (int) ($data['id_categorie'] ?? null);
        $nom_produit = $data['nom_produit'] ?? null;
        $prix = (float) ($data['prix'] ?? null);
        $stock_actuel = (int) ($data['stock_actuel'] ?? null);
        $statut = $data['statut'] ?? 'actif';
        $description = $data['description'] ?? null;

        echo  updateProduit($id_produit, $id_categorie, $nom_produit, $description, $prix, $stock_actuel, $statut) ? json_encode(["message" => "Produit modifié avec succès"]) : json_encode(["message" => "Erreur, produit non modifié"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_produit = (int) ($data['id_produit'] ?? null);

        echo  deleteProduit($id_produit) ? json_encode(["message" => "Produit supprimé avec succès"]) : json_encode(["message" => "Erreur, produit non supprimé"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
=======
  case 'GET':
    require_once "../models/Select.php";
    $produits = getProduit();
    echo  $produits ? json_encode($produits) : json_encode(["message" => "Aucun produit trouvé"]);
    break;
  case 'POST':
    require_once "../models/Insert.php";
    require_once "../models/Insert.php";

    $id_categorie = (int) ($_POST['id_categorie'] ?? 0);
    $nom_produit = $_POST['nom_produit'] ?? '';
    $prix = (float) ($_POST['prix'] ?? 0);
    $stock_actuel = (int) ($_POST['stock_actuel'] ?? 0);
    $statut = $_POST['statut'] ?? 'actif';
    $description = $_POST['description'] ?? '';
    $nom_fichier = $_POST['chemin_fichier'] ?? '';

    if (insertProduit($id_categorie, $nom_produit, $prix, $stock_actuel, $statut, $description)) {
      // Déplacer l'image si elle existe
      if (isset($_FILES['image'])) {
        $destination = $_SERVER['DOCUMENT_ROOT'] . "/Boutique/src/view/public/assets/Produits/" . $nom_fichier;
        move_uploaded_file($_FILES['image']['tmp_name'], $destination);
      }

      echo json_encode(["message" => true]);
    } else {
      echo json_encode(["message" => false]);
    }

    break;
  case 'PUT':
    require_once "../models/Update.php";
    $data = json_decode(file_get_contents("php://input"), true);
    $id_produit = (int) $data['id_produit'] ?? null;
    $id_categorie = (int) ($data['id_categorie'] ?? null);
    $nom_produit = $data['nom_produit'] ?? null;
    $prix = (float) ($data['prix'] ?? null);
    $stock_actuel = (int) ($data['stock_actuel'] ?? null);
    $statut = $data['statut'] ?? 'actif';
    $description = $data['description'] ?? null;

    echo  updateProduit($id_produit, $id_categorie, $nom_produit, $description, $prix, $stock_actuel, $statut) ? json_encode(["message" => "Produit modifié avec succès"]) : json_encode(["message" => "Erreur, produit non modifié"]);
    break;
  case 'DELETE':
    require_once "../models/Delete.php";
    $data = json_decode(file_get_contents("php://input"), true);
    $id_produit = (int) ($data['id_produit'] ?? null);

    echo  deleteProduit($id_produit) ? json_encode(["message" => "Produit supprimé avec succès"]) : json_encode(["message" => "Erreur, produit non supprimé"]);
    break;

  default:
    http_response_code(405);
    echo json_encode(["message" => "Méthode non autorisée"]);
    break;
>>>>>>> master
}
