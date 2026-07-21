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
        $users = getUtilisateur();
        echo  $users ? json_encode($users) : json_encode(["message" => "Aucun utilisateur trouvé"]);
        break;
    case 'POST':
        require_once "../models/Insert.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $nom = $data["nom"];
        $prenom = $data["prenom"];
        $email = $data["email"];
        $telephone = $data["telephone"];
        $mot_de_passe = password_hash($data["mot_de_passe"], PASSWORD_DEFAULT);
        $role = $data['role'];

        echo  insertUtilisateur($nom, $prenom, $email, $telephone, $mot_de_passe, $role) ? json_encode(["message" => 200]) : json_encode(["message" => "Erreur, utilisateur non ajouté"]);
        break;
    case 'PUT':
        require_once "../models/Update.php";
        $data = json_decode(file_get_contents("php://input"), true);

        $nom = $data["nom"];
        $prenom = $data["prenom"];
        $email = $data["email"];
        $telephone = $data["telephone"];
        $id = (int) $data["id"];
        $role = $data['role'];

        echo  updateUtilisateur($id, $nom, $prenom, $email, $telephone, $role) ? json_encode(["message" => "Utilisateur modifier avec succès"]) : json_encode(["message" => "Erreur, utilisateur non modifier"]);
        break;
    case 'DELETE':
        require_once "../models/Delete.php";

        $data = json_decode(file_get_contents("php://input"), true);

        $id = (int) $data['id'];

        echo  deleteUtilisateur($id) ? json_encode(["message" => "Utilisateur Supprimer avec succes"]) : json_encode(["message" => "Utilisateur nom"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
