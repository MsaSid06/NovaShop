CREATE DATABASE IF NOT EXISTS boutique_en_ligne;
USE boutique_en_ligne;

CREATE TABLE Utilisateur (
    id_utilisateur   INT AUTO_INCREMENT,
    nom              VARCHAR(100)        NOT NULL,
    prenom           VARCHAR(100)        NOT NULL,
    email            VARCHAR(150)        NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
    mot_de_passe     VARCHAR(255)        NOT NULL,
    role             ENUM('proprietaire', 'client') NOT NULL DEFAULT 'client',
    telephone        CHAR(9)             NOT NULL UNIQUE CHECK (telephone REGEXP '^7[0-9]{8}$'),
    date_creation    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_utilisateur PRIMARY KEY (id_utilisateur)

) ENGINE=InnoDB;

CREATE TABLE Categorie (
    id_categorie     INT AUTO_INCREMENT,
    nom_categorie    VARCHAR(100)        NOT NULL,
    description      TEXT                DEFAULT NULL,
    date_creation    DATETIME            DEFAULT CURRENT_TIMESTAMP,
    chemin_fichier   VARCHAR(255)        NOT NULL,

    CONSTRAINT pk_categorie PRIMARY KEY (id_categorie)

) ENGINE=InnoDB;


CREATE TABLE Produit (
    id_produit       INT AUTO_INCREMENT,
    id_categorie     INT                 NOT NULL,
    nom_produit      VARCHAR(150)        NOT NULL UNIQUE,
    description      TEXT                DEFAULT NULL,
    prix             DECIMAL(10,2)       NOT NULL CHECK (prix >= 0),
    stock_actuel     INT                 NOT NULL DEFAULT 0 CHECK (stock_actuel >= 0),
    statut           ENUM('actif', 'archiver') NOT NULL DEFAULT 'actif',
    date_ajout       DATETIME            DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_produit PRIMARY KEY (id_produit),

    CONSTRAINT fk_produit_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES Categorie(id_categorie)
        ON DELETE RESTRICT

) ENGINE=InnoDB;

CREATE TABLE Images_Produit (
    id_image         INT AUTO_INCREMENT,
    id_produit       INT                 NOT NULL,
    chemin_fichier   VARCHAR(255)        NOT NULL,
    ordre_affichage  INT                 NOT NULL DEFAULT 0 CHECK (ordre_affichage >= 0),

    CONSTRAINT pk_image_produit PRIMARY KEY (id_image),
    CONSTRAINT fk_image_produit
        FOREIGN KEY (id_produit)
        REFERENCES Produit(id_produit)
        ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE Stock_Historiques (
    id_stock_historique   INT AUTO_INCREMENT,
    id_produit            INT             NULL,
    date_mouvement        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type_mouvement         ENUM('retrait', 'ajout') NOT NULL,
    quantite               INT             NOT NULL,
    motif                  ENUM('achat', 'reapprovisionnement', 'endommagement') NOT NULL,

    CONSTRAINT pk_stock_historiques PRIMARY KEY (id_stock_historique),
    CONSTRAINT fk_stockhistorique_produit
        FOREIGN KEY (id_produit)
        REFERENCES Produit(id_produit)
        ON DELETE SET NULL

) ENGINE=InnoDB;


CREATE TABLE Commande (
    numero_commande    CHAR(5)             NOT NULL,
    id_client          INT                 NULL,
    date_commande      DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut             VARCHAR(255)        NOT NULL CHECK (statut IN ('attente','Livrer','Annuler')),
    adresse_livraison  VARCHAR(100)        NOT NULL,
    frais_livraison    DECIMAL(10,2)       DEFAULT 0 CHECK (frais_livraison >= 0),
    date_livraison     DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_commande PRIMARY KEY (numero_commande),
    UNIQUE (id_client, numero_commande),
    CONSTRAINT fk_commande_client
        FOREIGN KEY (id_client)
        REFERENCES Utilisateur(id_utilisateur)
        ON DELETE SET NULL

) ENGINE=InnoDB;


CREATE TABLE ligne_commande (
    id_ligne_commande   INT AUTO_INCREMENT,
    numero_commande      CHAR(5)         NOT NULL,
    id_produit           INT             NULL,
    quantite              INT             NOT NULL CHECK (quantite > 0),

    CONSTRAINT pk_ligne_commande PRIMARY KEY (id_ligne_commande),
    UNIQUE (numero_commande, id_produit),
    CONSTRAINT fk_ligneCommande_commande
        FOREIGN KEY (numero_commande)
        REFERENCES Commande(numero_commande)
        ON DELETE CASCADE,
    CONSTRAINT fk_ligneCommande_produit
        FOREIGN KEY (id_produit)
        REFERENCES Produit(id_produit)
        ON DELETE SET NULL

) ENGINE=InnoDB;


CREATE TABLE avis (
    id_avis          INT AUTO_INCREMENT,
    id_utilisateur   INT                 NULL,
    note             INT                 NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire      TEXT,
    date_creation    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_avis PRIMARY KEY (id_avis),
    CONSTRAINT fk_avis_utilisateur
        FOREIGN KEY (id_utilisateur)
        REFERENCES Utilisateur(id_utilisateur)
        ON DELETE SET NULL

) ENGINE=InnoDB;


-- INDEX POUR RECHERCHE RAPIDE
CREATE INDEX idx_produit_categorie ON Produit(id_categorie);
CREATE INDEX idx_produit_statut    ON Produit(statut);
CREATE INDEX idx_produit_prix      ON Produit(prix);
CREATE FULLTEXT INDEX idx_produit_recherche ON Produit(nom_produit, description);

CREATE INDEX idx_categorie_nom ON Categorie(nom_categorie);

CREATE INDEX idx_utilisateur_nom_prenom ON Utilisateur(nom, prenom);
CREATE INDEX idx_utilisateur_role       ON Utilisateur(role);

CREATE INDEX idx_commande_client ON Commande(id_client);
CREATE INDEX idx_commande_statut ON Commande(statut);
CREATE INDEX idx_commande_date   ON Commande(date_commande);

CREATE INDEX idx_lignecommande_produit ON ligne_commande(id_produit);

CREATE INDEX idx_stockhistorique_produit ON Stock_Historiques(id_produit);
CREATE INDEX idx_stockhistorique_date    ON Stock_Historiques(date_mouvement);

CREATE INDEX idx_avis_utilisateur ON avis(id_utilisateur);
CREATE INDEX idx_avis_note        ON avis(note);

CREATE INDEX idx_image_produit_ordre ON Images_Produit(id_produit, ordre_affichage);


-- INSERTS : Utilisateur (1 proprietaire + 22 clients = 23 lignes)
-- NB : le compte 'Moussa SIDIME' était marqué 'Admin' dans le
-- jeu fourni ; comme le rôle admin n'existe plus dans la table,
-- il a été basculé en 'client'.
INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, role, telephone) VALUES
('Diop',     'Moussa',    'moussa.diop@gmail.com',      'moussa', 'client', '771234567'),
('Fall',     'Aminata',   'aminata.fall@gmail.com',     '123456', 'client',       '772345678'),
('Moussa',   'SIDIME',    'moussa.sidime@gmail.com',    'moussa', 'proprietaire',       '774567890'),
('Ba',       'Ibrahima',  'ibrahima.ba@gmail.com',      '123456', 'client',       '775678901'),
('Sy',       'Awa',       'awa.sy@yahoo.fr',            '123456', 'client',       '776789012'),
('Diallo',   'Modou',     'modou.diallo@outlook.com',   '123456', 'client',       '777890123'),
('Kane',     'Mariama',   'mariama.kane@gmail.com',     '123456', 'client',       '778901234'),
('Ndoye',    'Khadija',   'khadija.ndoye@gmail.com',    '123456', 'client',       '779012345'),
('Gueye',    'Modou',     'modou.gueye@gmail.com',      '123456', 'client',       '700123456'),
('Sow',      'Aissatou',  'aissatou.sow@gmail.com',     '123456', 'client',       '701234567'),
('Thiam',    'Ousmane',   'ousmane.thiam@gmail.com',    '123456', 'client',       '702345678'),
('Diagne',   'Coumba',    'coumba.diagne@gmail.com',    '123456', 'client',       '703456789'),
('Faye',     'Abdoulaye', 'abdoulaye.faye@gmail.com',   '123456', 'client',       '704567890'),
('Seck',     'Ndeye',     'ndeye.seck@gmail.com',       '123456', 'client',       '705678901'),
('Ndour',    'Youssou',   'youssou.ndour@gmail.com',    '123456', 'client',       '706789012'),
('Cisse',    'Mamadou',   'mamadou.cisse@gmail.com',    '123456', 'client',       '707890123'),
('Toure',    'Rokhaya',   'rokhaya.toure@gmail.com',    '123456', 'client',       '708901234'),
('Diatta',   'Pape',      'pape.diatta@gmail.com',      '123456', 'client',       '709012345'),
('Mbaye',    'Astou',     'astou.mbaye@gmail.com',      '123456', 'client',       '761234567'),
('Wade',     'Alioune',   'alioune.wade@gmail.com',     '123456', 'client',       '762345678'),
('Sonko',    'Bineta',    'bineta.sonko@gmail.com',     '123456', 'client',       '763456789'),
('Camara',   'Lamine',    'lamine.camara@gmail.com',    '123456', 'client',       '764567890'),
('Diedhiou', 'Sokhna',    'sokhna.diedhiou@gmail.com',  '123456', 'client',       '765678901');

-- INSERTS : Categorie (inchangée, 6 lignes)
INSERT INTO Categorie (nom_categorie, description, chemin_fichier) VALUES
('Robes d''été',      'Robes légères et confortables pour l''été',        'robe_ete.jpg'),
('Robes Africaine',   'Vêtements africains pour toutes les occasions',    'robe_africaine.jpg'),
('Abaya',             'Robe ample parfaite pour la prière',               'abaya.jpg'),
('Homme',             'Vêtements pour hommes',                            'homme.jpg'),
('Enfants',           'Vêtements pour enfants',                           'enfant.jpg'),
('Accessoires',       'Accessoires de mode et bijoux',                    'accessoire.jpg');

-- INSERTS : Produit (24 lignes, 4 par catégorie)
INSERT INTO Produit (id_categorie, nom_produit, description, prix, stock_actuel, statut) VALUES
(1, 'Robe Ample',                       'Robe légère et confortable pour l''été',            3500.00, 10, 'actif'),
(1, 'Robe Fleurie Estivale',            'Robe fleurie en coton léger, idéale pour la plage',  4200.00, 12, 'actif'),
(1, 'Robe Bohème Légère',               'Robe fluide au style bohème pour les journées chaudes', 4700.00, 9, 'actif'),
(1, 'Robe Plage Rayée',                 'Robe rayée en lin, parfaite pour la plage',          3900.00, 14, 'actif'),
(2, 'Robe africaine traditionnelle',    'Robe africaine colorée pour toutes les occasions',   7999.00, 5,  'actif'),
(2, 'Boubou Wax Premium',               'Boubou en tissu wax haut de gamme',                  12500.00, 3, 'actif'),
(2, 'Robe Bazin Riche',                 'Robe en bazin riche brodée à la main',               15900.00, 6, 'actif'),
(2, 'Ensemble Pagne Wax',               'Ensemble deux pièces en pagne wax',                  9800.00, 7,  'actif'),
(3, 'Abaya élégante',                   'Abaya ample parfaite pour la prière',                5999.00, 8,  'actif'),
(3, 'Abaya brodée noire',               'Abaya noire avec broderies dorées',                  8999.00, 0,  'archiver'),
(3, 'Abaya satin perlé',                'Abaya en satin ornée de perles',                     10500.00, 4, 'actif'),
(3, 'Abaya sport',                      'Abaya légère et pratique pour le quotidien',         6500.00, 11, 'actif'),
(4, 'Chemise homme casual',             'Chemise décontractée pour hommes',                   3999.00, 15, 'actif'),
(4, 'Boubou homme grand boubou',        'Grand boubou traditionnel pour hommes',              15999.00, 4, 'actif'),
(4, 'Costume homme slim',               'Costume ajusté deux pièces pour hommes',             24999.00, 2, 'actif'),
(4, 'Polo homme coton',                 'Polo en coton respirant pour homme',                 4500.00, 20, 'actif'),
(5, 'Veste enfant',                     'Veste chaude pour enfants',                          2999.00, 20, 'actif'),
(5, 'Ensemble short et t-shirt enfant', 'Ensemble léger pour enfants, tissu respirant',       1999.00, 18, 'actif'),
(5, 'Robe fillette fleurie',            'Robe fleurie légère pour petites filles',            2500.00, 16, 'actif'),
(5, 'Pyjama enfant coton',              'Pyjama doux en coton pour enfants',                  2200.00, 22, 'actif'),
(6, 'Collier en perles',                'Collier élégant en perles pour femmes',              1999.00, 25, 'actif'),
(6, 'Bracelet artisanal',               'Bracelet fait main en perles africaines',            999.00,  30, 'actif'),
(6, 'Sac à main tissé',                 'Sac à main artisanal en fibres tissées',             6500.00, 10, 'actif'),
(6, 'Foulard imprimé wax',              'Foulard léger à motifs wax',                         1500.00, 0,  'archiver');

-- INSERTS : Images_Produit (30 lignes)
INSERT INTO Images_Produit (id_produit, chemin_fichier, ordre_affichage) VALUES
(1,  'robe_ete_1.jpg',            0),
(1,  'robe_ete_2.jpg',            1),
(2,  'robe_fleurie_1.jpg',        0),
(3,  'robe_boheme_1.jpg',         0),
(4,  'robe_plage_1.jpg',          0),
(5,  'robe_africaine_1.jpg',      0),
(5,  'robe_africaine_2.jpg',      1),
(6,  'boubou_wax_1.jpg',          0),
(7,  'robe_bazin_1.jpg',          0),
(8,  'ensemble_pagne_1.jpg',      0),
(9,  'abaya_elegante_1.jpg',      0),
(9,  'abaya_elegante_2.jpg',      1),
(10, 'abaya_brodee_1.jpg',        0),
(11, 'abaya_satin_1.jpg',         0),
(12, 'abaya_sport_1.jpg',         0),
(13, 'chemise_homme_1.jpg',       0),
(13, 'chemise_homme_2.jpg',       1),
(14, 'boubou_homme_1.jpg',        0),
(15, 'costume_homme_1.jpg',       0),
(16, 'polo_homme_1.jpg',          0),
(17, 'veste_enfant_1.jpg',        0),
(17, 'veste_enfant_2.jpg',        1),
(18, 'ensemble_enfant_1.jpg',     0),
(19, 'robe_fillette_1.jpg',       0),
(20, 'pyjama_enfant_1.jpg',       0),
(21, 'collier_perles_1.jpg',      0),
(21, 'collier_perles_2.jpg',      1),
(22, 'bracelet_artisanal_1.jpg',  0),
(23, 'sac_tisse_1.jpg',           0),
(24, 'foulard_wax_1.jpg',         0);

-- INSERTS : Stock_Historiques (24 lignes)
INSERT INTO Stock_Historiques (id_produit, type_mouvement, quantite, motif) VALUES
(1,  'ajout',   15, 'reapprovisionnement'),
(1,  'retrait', 5,  'achat'),
(2,  'ajout',   10, 'reapprovisionnement'),
(3,  'retrait', 2,  'achat'),
(4,  'ajout',   12, 'reapprovisionnement'),
(5,  'retrait', 5,  'achat'),
(6,  'ajout',   6,  'reapprovisionnement'),
(7,  'retrait', 3,  'achat'),
(8,  'ajout',   8,  'reapprovisionnement'),
(9,  'retrait', 4,  'achat'),
(10, 'retrait', 2,  'endommagement'),
(11, 'ajout',   5,  'reapprovisionnement'),
(12, 'retrait', 3,  'achat'),
(13, 'ajout',   20, 'reapprovisionnement'),
(14, 'retrait', 1,  'achat'),
(15, 'ajout',   3,  'reapprovisionnement'),
(16, 'retrait', 6,  'achat'),
(17, 'retrait', 3,  'achat'),
(18, 'ajout',   10, 'reapprovisionnement'),
(19, 'retrait', 4,  'achat'),
(20, 'ajout',   15, 'reapprovisionnement'),
(21, 'retrait', 8,  'achat'),
(22, 'ajout',   30, 'reapprovisionnement'),
(24, 'retrait', 2,  'endommagement');

-- INSERTS : Commande (25 lignes, clients uniquement)
INSERT INTO Commande (numero_commande, id_client, statut, adresse_livraison, frais_livraison, date_commande, date_livraison) VALUES
('CMD01', 2,  'Livrer',  'Sacré-Cœur 3, Dakar',      1000.00, '2026-01-10 09:00:00', '2026-01-13 14:00:00'),
('CMD02', 3,  'Livrer',  'Parcelles Assainies, Dakar',1500.00,'2026-01-15 10:00:00', '2026-01-18 15:00:00'),
('CMD03', 4,  'attente', 'Mermoz, Dakar',             1000.00, '2026-07-14 09:30:00', '2026-07-18 09:30:00'),
('CMD04', 5,  'Annuler', 'Ouakam, Dakar',             1200.00, '2026-02-01 11:00:00', '2026-02-01 11:00:00'),
('CMD05', 6,  'Livrer',  'Yoff, Dakar',               1000.00, '2026-02-10 13:00:00', '2026-02-13 16:00:00'),
('CMD06', 7,  'Livrer',  'Grand Yoff, Dakar',         1300.00, '2026-02-20 08:45:00', '2026-02-23 12:00:00'),
('CMD07', 8,  'attente', 'Liberté 6, Dakar',          1000.00, '2026-07-15 08:00:00', '2026-07-19 08:00:00'),
('CMD08', 9,  'Livrer',  'Point E, Dakar',            1400.00, '2026-03-05 14:00:00', '2026-03-08 17:00:00'),
('CMD09', 10, 'Livrer',  'Ngor, Dakar',               1000.00, '2026-03-12 09:00:00', '2026-03-15 13:00:00'),
('CMD10', 11, 'Annuler', 'HLM, Dakar',                1100.00, '2026-03-20 10:30:00', '2026-03-20 10:30:00'),
('CMD11', 12, 'Livrer',  'Medina, Dakar',             1000.00, '2026-04-02 12:00:00', '2026-04-05 15:00:00'),
('CMD12', 13, 'Livrer',  'Fann, Dakar',               1200.00, '2026-04-10 09:15:00', '2026-04-13 14:30:00'),
('CMD13', 14, 'attente', 'Plateau, Dakar',            1500.00, '2026-07-13 07:45:00', '2026-07-17 07:45:00'),
('CMD14', 15, 'Livrer',  'Colobane, Dakar',           1000.00, '2026-04-25 16:00:00', '2026-04-28 18:00:00'),
('CMD15', 16, 'Livrer',  'Pikine, Dakar',             1300.00, '2026-05-01 09:00:00', '2026-05-04 12:00:00'),
('CMD16', 17, 'Livrer',  'Guédiawaye, Dakar',         1400.00, '2026-05-10 10:00:00', '2026-05-13 14:00:00'),
('CMD17', 18, 'Annuler', 'Rufisque, Dakar',           1600.00, '2026-05-15 11:30:00', '2026-05-15 11:30:00'),
('CMD18', 19, 'Livrer',  'Grand Dakar, Dakar',        1000.00, '2026-05-22 08:00:00', '2026-05-25 12:00:00'),
('CMD19', 20, 'Livrer',  'Sicap Liberté, Dakar',      1200.00, '2026-06-01 09:00:00', '2026-06-04 13:00:00'),
('CMD20', 21, 'Livrer',  'Almadies, Dakar',           1500.00, '2026-06-10 10:00:00', '2026-06-13 15:00:00'),
('CMD21', 22, 'attente', 'Cambérène, Dakar',          1000.00, '2026-07-10 09:00:00', '2026-07-16 09:00:00'),
('CMD22', 23, 'Livrer',  'Patte d''Oie, Dakar',       1100.00, '2026-06-20 14:00:00', '2026-06-23 17:00:00'),
('CMD23', 2,  'Livrer',  'Sacré-Cœur 3, Dakar',       1000.00, '2026-06-28 09:00:00', '2026-07-01 13:00:00'),
('CMD24', 3,  'Livrer',  'Parcelles Assainies, Dakar',1500.00, '2026-07-02 10:00:00', '2026-07-05 14:00:00'),
('CMD25', 4,  'attente', 'Mermoz, Dakar',             1000.00, '2026-07-15 11:00:00', '2026-07-19 11:00:00');

-- INSERTS : ligne_commande (32 lignes)
INSERT INTO ligne_commande (numero_commande, id_produit, quantite) VALUES
('CMD01', 1,  2),
('CMD01', 21, 1),
('CMD02', 5,  1),
('CMD02', 22, 2),
('CMD03', 13, 1),
('CMD04', 14, 1),
('CMD05', 17, 1),
('CMD05', 18, 2),
('CMD06', 2,  1),
('CMD06', 9,  1),
('CMD07', 16, 1),
('CMD08', 6,  1),
('CMD09', 3,  2),
('CMD10', 15, 1),
('CMD11', 11, 1),
('CMD11', 23, 1),
('CMD12', 7,  1),
('CMD13', 20, 2),
('CMD14', 10, 1),
('CMD15', 19, 1),
('CMD15', 24, 1),
('CMD16', 8,  1),
('CMD17', 12, 1),
('CMD18', 4,  2),
('CMD19', 21, 3),
('CMD20', 22, 1),
('CMD21', 13, 1),
('CMD22', 17, 1),
('CMD22', 18, 1),
('CMD23', 1,  1),
('CMD24', 5,  1),
('CMD25', 9,  1);

-- INSERTS : avis (22 lignes)
INSERT INTO avis (id_utilisateur, note, commentaire) VALUES
(2,  5, 'Très belle robe, tissu de qualité et livraison rapide.'),
(3,  4, 'Bon produit dans l''ensemble, un peu cher pour la qualité.'),
(4,  3, 'Correct mais la couleur était un peu différente des photos.'),
(5,  2, 'Commande annulée, service client réactif tout de même.'),
(6,  5, 'Excellent rapport qualité-prix, je recommande vivement.'),
(7,  4, 'Le boubou pour homme est magnifique, tissu solide.'),
(8,  5, 'Livraison rapide et polo très confortable.'),
(9,  4, 'Le wax est de très bonne qualité, je suis satisfaite.'),
(10, 3, 'Robe correcte mais taille un peu grande.'),
(11, 2, 'Costume annulé mais remboursement rapide.'),
(12, 5, 'Abaya magnifique, parfaitement conforme à la description.'),
(13, 4, 'Bazin riche superbe, broderie très soignée.'),
(14, 3, 'Livraison un peu longue mais produit satisfaisant.'),
(15, 5, 'Superbe qualité, je recommande cette boutique.'),
(16, 4, 'Le pyjama enfant est doux et bien fini.'),
(17, 5, 'Ensemble enfant parfait, tissu agréable.'),
(18, 2, 'Commande annulée, dommage car le produit me plaisait.'),
(19, 4, 'Robe fillette très jolie, ma fille adore.'),
(20, 5, 'Collier magnifique, exactement comme sur la photo.'),
(21, 4, 'Bracelet artisanal de belle facture.'),
(22, 3, 'Sac à main correct mais un peu petit.'),
(23, 5, 'Foulard wax superbe, coloris magnifiques.');


-- Requêtes de vérification
SELECT * FROM Utilisateur;
SELECT * FROM Categorie;
SELECT * FROM Produit;
SELECT * FROM Images_Produit;
SELECT * FROM Stock_Historiques;
SELECT * FROM Commande;
SELECT * FROM ligne_commande;
SELECT * FROM avis;