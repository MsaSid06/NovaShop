<?php

require_once "./acces.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    require_once "../models/Select.php";
    // $data = json_decode(file_get_contents("php://input"), true);
    // $action = $data['action'] ?? null;
    // if ($action === 'getCategorie' || $action === null) {
    $categories = getCategorie();
    echo  $categories ? json_encode([$categories]) : json_encode(["message" => false]);
    break;
  // } else {

  //   $categories = getRevenueByCategories();
  //   echo  $categories ? json_encode([$categories]) : json_encode(["message" => false]);
  //   break;
  // }
  case 'POST':
    require_once "../models/Insert.php";


    // $id_categorie = (int) ($_POST['id_categorie'] ?? 0);
    $nom_categorie = $_POST['nom_categorie'] ?? '';
    $chemin_fichier = $_POST['chemin_fichier'] ?? '';
    $description = $_POST['description'] ?? '';


    if (insertCategorie($nom_categorie, $chemin_fichier, $description)) {
      // Déplacer l'image si elle existe
      if (isset($_FILES['image'])) {
        $destination = $_SERVER['DOCUMENT_ROOT'] . "/Boutique/src/view/public/assets/categories/" . $chemin_fichier;
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $destination)) {
          echo json_encode(["message" => false]);
        }
      } else {
        echo json_encode(["message" => false]);
      }

      echo json_encode(["message" => true]);
    } else {
      echo json_encode(["message" => false]);
    }
    break;
  case 'PUT':
    require_once "../models/Update.php";
    $data = json_decode(file_get_contents("php://input"), true);
    $id_categorie = (int) ($data['id_categorie'] ?? null);
    $nom_categorie = $data['nom_categorie'] ?? null;
    $chemin_fichier = $data['chemin_fichier'] ?? null;
    $description = $data['description'] ?? null;

    echo  updateCategorie($id_categorie, $nom_categorie, $chemin_fichier, $description) ? json_encode(["message" => "Catégorie modifiée avec succès"]) : json_encode(["message" => "Erreur, catégorie non modifiée"]);
    break;
  case 'DELETE':
    require_once "../models/Delete.php";
    $data = json_decode(file_get_contents("php://input"), true);
    $id_categorie = (int) ($data['id_categorie'] ?? null);

    $ligne   = deleteCategorie($id_categorie);
    echo $ligne ? json_encode(["message" => $ligne]) : json_encode(["message" => "Erreur, catégorie non supprimée"]);
    break;

  default:
    http_response_code(405);
    echo json_encode(["message" => "Méthode non autorisée"]);
    break;
}
