<?php

session_start();
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once "./acces.php";
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    require_once "../models/Select.php";
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $mdp = $data["mot_de_passe"];
    $users = getUtilisateurMail($email);
    if ($users && password_verify($mdp, $users['mot_de_passe'])) {
        $_SESSION['user'] = $users;
        echo json_encode(["message" => true, "user" => $users]);
    } else {
        echo json_encode(["message" => "Email ou mot de passe incorrect"]);
    }
}
