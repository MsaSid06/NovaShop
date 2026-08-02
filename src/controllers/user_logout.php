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

if ($method === 'GET') {
    if (isset($_SESSION['user'])) {
        session_destroy();
        echo json_encode(["message" => 200]);
    } else {
        echo json_encode(["message" => "Vous n'etes pas connecté"]);
    }
}
