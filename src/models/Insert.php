<?php

require_once "../../config/database.php";



function insertUtilisateur(string $nom, string $prenom, string $email, string $telephone, string $mot_de_passe, string $role = 'client')
{
    global $pdo;
    try {
        $sql = "INSERT INTO Utilisateur (nom, prenom, email, telephone, mot_de_passe, role)
                VALUES (:nom, :prenom, :email, :telephone, :mot_de_passe, :role)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telephone', $telephone);
        $stmt->bindParam(':mot_de_passe', $mot_de_passe);
        $stmt->bindParam(':role', $role);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}



function insertCategorie(string $nom_categorie, string $chemin_fichier, ?string $description = null)
{
    global $pdo;
    try {
        $sql = "INSERT INTO Categorie (nom_categorie, chemin_fichier, description) VALUES (:nom_categorie, :chemin_fichier, :description)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nom_categorie', $nom_categorie);
        $stmt->bindParam(':chemin_fichier', $chemin_fichier);
        $stmt->bindParam(':description', $description);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

// Table : Produit

function insertProduit(int $id_categorie, string $nom_produit, float $prix, int $stock_actuel, string $statut = 'actif', ?string $description = null)
{
    global $pdo;
    try {
        $sql = "INSERT INTO Produit (id_categorie, nom_produit, description, prix, stock_actuel, statut)
                VALUES (:id_categorie, :nom_produit, :description, :prix, :stock_actuel, :statut)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_categorie', $id_categorie, PDO::PARAM_INT);
        $stmt->bindParam(':nom_produit', $nom_produit);
        $stmt->bindValue(':description', $description);
        $stmt->bindParam(':prix', $prix);
        $stmt->bindParam(':stock_actuel', $stock_actuel, PDO::PARAM_INT);
        $stmt->bindParam(':statut', $statut);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

// Table : Images_Produit

function insertImageProduit(int $id_produit, string $chemin_fichier, int $ordre_affichage)
{
    global $pdo;
    try {
        $sql = "INSERT INTO Images_Produit (id_produit, chemin_fichier, ordre_affichage)
                VALUES (:id_produit, :chemin_fichier, :ordre_affichage)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        $stmt->bindParam(':chemin_fichier', $chemin_fichier);
        $stmt->bindParam(':ordre_affichage', $ordre_affichage, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

// Table : Stock_Historiques

function insertStockHistorique(int $id_produit, string $type_mouvement, int $quantite, string $motif)
{
    global $pdo;
    try {
        $sql = "INSERT INTO Stock_Historiques (id_produit, type_mouvement, quantite, motif)
                VALUES (:id_produit, :type_mouvement, :quantite, :motif)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        $stmt->bindParam(':type_mouvement', $type_mouvement);
        $stmt->bindParam(':quantite', $quantite, PDO::PARAM_INT);
        $stmt->bindParam(':motif', $motif);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

// Table : Commande

function insertCommande(string $numero_commande, int $id_client, DateTime $date_commande, string $adresse_livraison, string $statut, float $frais_livraison, DateTime $date_livraison)
{
    global $pdo;
    try {
        $sql = "INSERT INTO Commande (numero_commande, id_client, date_commande, adresse_livraison, statut, frais_livraison, date_livraison)
                VALUES (:numero_commande, :id_client, :date_commande, :adresse_livraison, :statut, :frais_livraison, :date_livraison)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande);
        $stmt->bindParam(':id_client', $id_client, PDO::PARAM_INT);
        $stmt->bindParam(':date_commande', $date_commande);
        $stmt->bindParam(':adresse_livraison', $adresse_livraison);
        $stmt->bindParam(':statut', $statut);
        $stmt->bindParam(':frais_livraison', $frais_livraison, PDO::PARAM_STR);
        $stmt->bindParam(':date_livraison', $date_livraison);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function insertLigneCommande(string $numero_commande, int $id_produit, int $quantite)
{
    global $pdo;
    try {
        $sql = "INSERT INTO ligne_commande (numero_commande, id_produit, quantite)
        VALUES (:numero_commande, :id_produit, :quantite)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        $stmt->bindParam(':quantite', $quantite, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function insertAvis(int $id_utilisateur, int $note, ?string $commentaire = null)
{
    global $pdo;
    try {
        $sql = "INSERT INTO avis (id_utilisateur, note, commentaire)
                VALUES (:id_utilisateur, :note, :commentaire)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur, PDO::PARAM_INT);
        $stmt->bindParam(':note', $note, PDO::PARAM_INT);
        $stmt->bindValue(':commentaire', $commentaire);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}
