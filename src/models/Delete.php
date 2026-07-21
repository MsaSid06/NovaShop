<?php

require_once "../../config/database.php";



function deleteUtilisateur(int $id_utilisateur)
{
    global $pdo;
    try {
        $sql = "DELETE FROM Utilisateur WHERE id_utilisateur = :id_utilisateur";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteCategorie(int $id_categorie)
{
    global $pdo;
    try {
        $sql = "DELETE FROM Categorie WHERE id_categorie = :id_categorie";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_categorie', $id_categorie, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteProduit(int $id_produit)
{
    global $pdo;
    try {
        $sql = "DELETE FROM Produit WHERE id_produit = :id_produit";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteImageProduit(int $id_image)
{

    global $pdo;
    try {
        $sql = "DELETE FROM Images_Produit WHERE id_image = :id_image";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_image', $id_image, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteStockHistorique(int $id_stock_historique)
{

    global $pdo;
    try {
        $sql = "DELETE FROM Stock_Historiques WHERE id_stock_historique = :id_stock_historique";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_stock_historique', $id_stock_historique, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteCommande(string $numero_commande, int $id_client)
{

    global $pdo;
    try {
        $sql = "DELETE FROM Commande WHERE numero_commande = :numero_commande AND id_client = :id_client";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande, PDO::PARAM_STR);
        $stmt->bindParam(':id_client', $id_client, PDO::PARAM_INT);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}
function deleteLigneCommande(string $numero_commande)
{

    global $pdo;
    try {
        $sql = "DELETE FROM ligne_commande WHERE numero_commande = :numero_commande";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande, PDO::PARAM_STR);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function deleteAvis(int $id_avis)
{

    global $pdo;
    try {
        $sql = "DELETE FROM Avis WHERE id_avis = :id_avis";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_avis', $id_avis, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}
