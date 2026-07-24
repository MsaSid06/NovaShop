<?php

require_once "../../config/database.php";


// $pdo = ConnectionBD();

function getUtilisateur()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Utilisateur";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $Utilisateur = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $Utilisateur;

    } catch (Exception $e) {
        return $e->getCode();

    }
}
function getUtilisateurMail(string $email)
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Utilisateur WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $Utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);
        return $Utilisateur;
    } catch (Exception $e) {
        return $e->getCode();
    }
}

//         $stmt->execute();
//         $Utilisateur = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         return $Utilisateur;

//     } catch (Exception $e) {
//         return $e->getCode();

//     }
// }


function getCategorie()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Categorie";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $Categorie = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $Categorie;

    } catch (Exception $e) {
        return $e->getCode();

    }
}


function getProduit()
{
    global $pdo;
    try {
        $sql = "SELECT p.*, i.chemin_fichier , c.nom_categorie, c.id_categorie FROM Produit p  Left JOIN Images_Produit i ON p.id_produit = i.id_produit LEFT JOIN Categorie c ON p.id_categorie = c.id_categorie GROUP BY p.id_produit HAVING stock_actuel > 0 ;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $Produit = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $Produit;

    } catch (Exception $e) {
        return $e->getCode();
    }
}

function getImagesProduit()
{
    global $pdo;
    try {
        $sql = "SELECT i.* , p.statut FROM Images_Produit i join Produits p on p.id_produits = i.id_produits  where p.statut = 'actif' ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $ImagesProduit  = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $ImagesProduit ;

    } catch (Exception $e) {
        return $e->getCode();

    }
}


function getCommande()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Commande";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $Commande = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $Commande;

    } catch (Exception $e) {
        return $e->getCode();
    }
}
function getCommandeEncours()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Commande where statut = 'Livrer' ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $Commande = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $Commande;

    } catch (Exception $e) {
        return $e->getCode();
    }
}

function getStockHistoriques()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM Stock_Historiques";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $stockHistoriques = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $stockHistoriques;

    } catch (Exception $e) {
        return $e->getCode();
    }
}

function getLigneCommande()
{
    global $pdo;
    try {
        $sql = "SELECT * FROM ligne_commande";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $ligneCommande = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $ligneCommande;

    } catch (Exception $e) {
        return $e->getCode();
    }
}

function getAvis()
{
    global $pdo;
    try {
        $sql = "SELECT a.*, u.nom , u.prenom FROM Avis a join Utilisateur u on a.id_utilisateur = u.id_utilisateur ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $avis = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $avis;

    } catch (Exception $e) {
        return $e->getCode();
    }
}

// http://localhost/BOUTIQUE/config/database.php
