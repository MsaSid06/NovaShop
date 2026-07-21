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
        $commandes = getCommande();
        echo  $commandes ? json_encode($commandes) : json_encode(["message" => "Aucune commande trouvée"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $id_client = (int) $data['id_client'] ?? null;
        $date_commande =  $data['date_commande'] ?? null;
        $numero_commande =  $data['numero_commande'] ?? null;
        $addresse_livraison = $data['adresse_livraison'] ?? null;
        $statut = $data['statut'] ?? null;
        $frais_livraison = (float) $data['frais_livraison'] ?? null;
        $date_livraison = $data['date_livraison'] ?? null;

        echo  insertCommande($numero_commande, $id_client, $date_commande, $addresse_livraison, $statut, $frais_livraison, $date_livraison) ? json_encode(["message" => "Commande ajoutée avec succès"]) : json_encode(["message" => "Erreur, commande non ajoutée"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $numero_commande = (string) $data['numero_commande'] ?? null;
        $id_client = (int) $data['id_client'] ?? null;
        $statut = $data['statut'] ?? null;
        $adresse_livraison = $data['adresse_livraison'] ?? null;
        $frais_livraison = (float) $data['frais_livraison'] ?? null;
        $date_livraison = $data['date_livraison'] ?? null;

        echo  updateCommande($numero_commande, $id_client, $statut, $adresse_livraison, $frais_livraison, $date_livraison) ? json_encode(["message" => "Commande modifiée avec succès"]) : json_encode(["message" => "Erreur, commande non modifiée"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $id_client = (int) $data['id_client'] ?? null;
        $numero_commande = (string) $data['numero_commande'] ?? null;

        echo  deleteCommande($numero_commande, $id_client) ? json_encode(["message" => "Commande supprimée avec succès"]) : json_encode(["message" => "Erreur, commande non supprimée"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
