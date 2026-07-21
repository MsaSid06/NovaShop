<?php

session_start();
require_once "./acces.php";


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

if (isset($_SESSION['user'])) {
    echo json_encode(['connecter' => true , 'nom' => $_SESSION['user']['nom'] , 'prenom' => $_SESSION['user']['prenom']]);
} else {
    echo json_encode(['connecter' => false]);
}
