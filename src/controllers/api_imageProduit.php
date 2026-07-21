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
        $images = getImagesProduit();
        echo  $images ? json_encode($images) : json_encode(["message" => "Aucune image trouvée"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_produit = (int) ($data['id_produit'] ?? null);
        $chemin_fichier = $data['chemin_fichier'] ?? null;
        $ordre_affichage = (int) ($data['ordre_affichage'] ?? null);

        echo  insertImageProduit($id_produit, $chemin_fichier, $ordre_affichage) ? json_encode(["message" => "Image ajoutée avec succès"]) : json_encode(["message" => "Erreur, image non ajoutée"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_image = (int) ($data['id_image'] ?? null);
        $id_produit = (int) ($data['id_produit'] ?? null);
        $chemin_fichier = $data['chemin_fichier'] ?? null;
        $ordre_affichage = (int) ($data['ordre_affichage'] ?? null);

        echo  updateImageProduit($id_image, $id_produit, $chemin_fichier, $ordre_affichage) ? json_encode(["message" => "Image modifiée avec succès"]) : json_encode(["message" => "Erreur, image non modifiée"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_image = (int) ($data['id_image'] ?? null);

        echo  deleteImageProduit($id_image) ? json_encode(["message" => "Image supprimée avec succès"]) : json_encode(["message" => "Erreur, image non supprimée"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
