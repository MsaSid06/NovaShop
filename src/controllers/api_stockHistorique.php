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
        $historiques = getStockHistoriques();
        echo  $historiques ? json_encode($historiques) : json_encode(["message" => "Aucun historique de stock trouvé"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $id_produit = (int) ($data['id_produit'] ?? null);
        $type_mouvement = $data['type_mouvement'] ?? null;
        $quantite = (int) ($data['quantite'] ?? null);
        $motif = $data['motif'] ?? null;

        echo  insertStockHistorique($id_produit, $type_mouvement, $quantite, $motif) ? json_encode(["message" => "Mouvement de stock ajouté avec succès"]) : json_encode(["message" => "Erreur, mouvement de stock non ajouté"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_stock_historique = (int) ($data['id_stock_historique'] ?? null);
        $type_mouvement = $data['type_mouvement'] ?? null;
        $quantite = (int) ($data['quantite'] ?? null);
        $motif = $data['motif'] ?? null;

        echo  updateStockHistorique($id_stock_historique, $type_mouvement, $quantite, $motif) ? json_encode(["message" => "Mouvement de stock modifié avec succès"]) : json_encode(["message" => "Erreur, mouvement de stock non modifié"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_stock_historique = (int) ($data['id_stock_historique'] ?? null);

        echo  deleteStockHistorique($id_stock_historique) ? json_encode(["message" => "Mouvement de stock supprimé avec succès"]) : json_encode(["message" => "Erreur, mouvement de stock non supprimé"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
