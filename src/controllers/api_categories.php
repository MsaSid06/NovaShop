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
        $categories = getCategorie();
        echo  $categories ? json_encode($categories) : json_encode(["message" => "Aucune catégorie trouvée"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $nom_categorie = $data['nom_categorie'] ?? null;
        $chemin_fichier = $data['chemin_fichier'] ?? null;
        $description = $data['description'] ?? null;

        echo  insertCategorie($nom_categorie, $chemin_fichier, $description) ? json_encode(["message" => "Catégorie ajoutée avec succès"]) : json_encode(["message" => "Erreur, catégorie non ajoutée"]);
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

        echo  deleteCategorie($id_categorie) ? json_encode(["message" => "Catégorie supprimée avec succès"]) : json_encode(["message" => "Erreur, catégorie non supprimée"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
