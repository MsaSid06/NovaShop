<?php

// function connexionBD()
// {
$host = "localhost";
$db = "boutique_en_ligne";
$mdp = "lome2006";
$user = "root";
try {

    $pdo  = new PDO("mysql:host=$host;dbname=$db", $user, $mdp);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //activer les exept
    // return $pdo;
} catch (Exception $e) {
    return $e->getMessage();

}
// }
// http://localhost/BOUTIQUE EN LIGNE/config/database.php
// http://localhost/TP_BD/

/**
 * git init
*    git add .
*    git commit -m "init"
*    git remote add origin URL //faire le lien ave le github
*    git push -u origin main // envoyer le dossier
 */
