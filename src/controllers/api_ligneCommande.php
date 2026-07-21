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
        $lignes = getLigneCommande();
        echo  $lignes ? json_encode($lignes) : json_encode(["message" => "Aucune ligne de commande trouvée"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $numero_commande = $data['numero_commande'] ?? null;
        $id_produit = (int) ($data['id_produit'] ?? null);
        $quantite = (int) ($data['quantite'] ?? null);

        echo  insertLigneCommande($numero_commande, $id_produit, $quantite) ? json_encode(["message" => "Ligne de commande ajoutée avec succès"]) : json_encode(["message" => "Erreur, ligne de commande non ajoutée"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $numero_commande = $data['numero_commande'] ?? null;
        $id_produit = (int) ($data['id_produit'] ?? null);
        $quantite = (int) ($data['quantite'] ?? null);

        echo  updateLigneCommande($numero_commande, $id_produit, $quantite) ? json_encode(["message" => "Ligne de commande modifiée avec succès"]) : json_encode(["message" => "Erreur, ligne de commande non modifiée"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $numero_commande = (string) ($data['numero_commande'] ?? null);

        echo  deleteLigneCommande($numero_commande) ? json_encode(["message" => "Ligne de commande supprimée avec succès"]) : json_encode(["message" => "Erreur, ligne de commande non supprimée"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
