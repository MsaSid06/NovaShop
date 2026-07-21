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
        $avis = getAvis();
        echo  $avis ? json_encode($avis) : json_encode(["message" => "Aucun avis trouvé"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $id_utilisateur = (int) $data['id_utilisateur'];
        $note = (int) $data['note'];
        $commentaire =  $data['commentaire'];

        echo  insertAvis($id_utilisateur, $note, $commentaire) ? json_encode(["message" => "Avis ajouté avec succès"]) : json_encode(["message" => "Erreur, avis non ajouté"]);
        break;
        // case 'PUT':
        //     require_once "../models/Update.php";
        //     $data = json_decode(file_get_contents("php://input"), true);

        //     echo  updateAvis() ? json_encode(["message" => "Avis modifié avec succès"]) : json_encode(["message" => "Erreur, avis non modifié"]);
        //     break;
    case 'DELETE':
        require_once "../models/Delete.php";
        $data = json_decode(file_get_contents("php://input"), true);
        $id_avis = (int) $data['id_avis'];
        echo  deleteAvis($id_avis) ? json_encode(["message" => "Avis supprimé avec succès"]) : json_encode(["message" => "Erreur, avis non supprimé"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
