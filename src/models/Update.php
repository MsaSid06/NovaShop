<?php

require_once "../../config/database.php";



function updateUtilisateur(int $id_utilisateur, string $nom, string $prenom, string $email, string $telephone, string $role)
{

    global $pdo;
    try {
        $sql = "UPDATE Utilisateur SET nom = :nom, prenom = :prenom, email = :email, telephone = :telephone, role = :role WHERE id_utilisateur = :id_utilisateur";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur, PDO::PARAM_INT);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telephone', $telephone);
        $stmt->bindParam(':role', $role);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

function updateUtilisateurMDP(int $id_utilisateur, string $mdp)
{

    global $pdo;
    try {
        $sql = "UPDATE Utilisateur SET mot_de_passe = :mdp WHERE id_utilisateur = :id_utilisateur";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur, PDO::PARAM_INT);
        $stmt->bindParam(':mdp', $mdp);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function updateCategorie(int $id_categorie, string $nom_categorie, string $chemin_fichier, ?string $description = null)
{

    global $pdo;
    try {
        $sql = "UPDATE Categorie SET nom_categorie = :nom_categorie, chemin_fichier =:chemin_fichier ,description = :description WHERE id_categorie = :id_categorie";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_categorie', $id_categorie, PDO::PARAM_INT);
        $stmt->bindParam(':nom_categorie', $nom_categorie);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':chemin_fichier', $chemin_fichier);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function updateProduit(int $id_produit, int $id_categorie, string $nom_produit, ?string $description, float $prix, int $stock_actuel, string $statut)
{

    global $pdo;
    try {
        $sql = "UPDATE Produit SET id_categorie = :id_categorie, nom_produit = :nom_produit, description = :description, prix = :prix, stock_actuel = :stock_actuel, statut = :statut WHERE id_produit = :id_produit";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
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


function updateImageProduit(int $id_image, int $id_produit, string $chemin_fichier, int $ordre_affichage)
{

    global $pdo;
    try {
        $sql = "UPDATE Images_Produit SET id_produit = :id_produit, chemin_fichier = :chemin_fichier, ordre_affichage = :ordre_affichage WHERE id_image = :id_image";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_image', $id_image, PDO::PARAM_INT);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);
        $stmt->bindParam(':chemin_fichier', $chemin_fichier);
        $stmt->bindParam(':ordre_affichage', $ordre_affichage, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function updateStockHistorique(int $id_stock_historique, string $type_mouvement, int $quantite, string $motif)
{

    global $pdo;
    try {
        $sql = "UPDATE Stock_Historiques SET type_mouvement = :type_mouvement, quantite = :quantite, motif = :motif WHERE id_stock_historique = :id_stock_historique";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_stock_historique', $id_stock_historique, PDO::PARAM_INT);
        $stmt->bindParam(':type_mouvement', $type_mouvement);
        $stmt->bindParam(':quantite', $quantite, PDO::PARAM_INT);
        $stmt->bindParam(':motif', $motif);
        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}


function updateCommande(string $numero_commande, int $id_client, string $statut, string $adresse_livraison, float $frais_livraison, DateTime $date_livraison)
{

    global $pdo;
    try {
        $sql = "UPDATE Commande SET statut = :statut , adresse_livraison = :adresse_livraison , frais_livraison = :frais_livraison , date_livraison = :date_livraison  WHERE numero_commande = :numero_commande AND id_client = :id_client ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande, PDO::PARAM_INT);
        $stmt->bindParam(':adresse_livraison', $adresse_livraison);
        $stmt->bindParam(':statut', $statut);
        $stmt->bindParam(':frais_livraison', $frais_livraison);
        $stmt->bindParam(':date_livraison', $date_livraison);
        $stmt->bindParam(':id_client', $id_client, PDO::PARAM_INT);

        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}

function updateLigneCommande(string $numero_commande, int $id_produit, int $quantite)
{

    global $pdo;
    try {
        $sql = "UPDATE Ligne_Commande SET quantite = :quantite WHERE numero_commande = :numero_commande AND id_produit = :id_produit ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':numero_commande', $numero_commande, PDO::PARAM_STR);
        $stmt->bindParam(':quantite', $quantite, PDO::PARAM_INT);
        $stmt->bindParam(':id_produit', $id_produit, PDO::PARAM_INT);

        return $stmt->execute();
    } catch (Exception $e) {
        return $e->getCode();
    }
}
