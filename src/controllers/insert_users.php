<?php

// require_once 'connexion.php';
// require_once '../models/utilisateur.php';
require_once '../models/Insert.php';

$users = [
    ['Diop', 'Moussa', 'moussa.diop@gmail.com', '771234567', 'moussa', 'client'],
    ['Fall', 'Aminata', 'aminata.fall@gmail.com', '772345678', '123456', 'client'],
    ['Moussa', 'SIDIME', 'moussasidime590@gmail.com', '785823683', 'moussasidime', 'proprietaire'],
    ['Ba', 'Ibrahima', 'ibrahima.ba@gmail.com', '775678901', '123456', 'client'],
    ['Sy', 'Awa', 'awa.sy@yahoo.fr', '776789012', '123456', 'client'],
    ['Diallo', 'Modou', 'modou.diallo@outlook.com', '777890123', '123456', 'client'],
    ['Kane', 'Mariama', 'mariama.kane@gmail.com', '778901234', '123456', 'client'],
    ['Ndoye', 'Khadija', 'khadija.ndoye@gmail.com', '779012345', '123456', 'client'],
    ['Gueye', 'Modou', 'modou.gueye@gmail.com', '700123456', '123456', 'client'],
    ['Sow', 'Aissatou', 'aissatou.sow@gmail.com', '701234567', '123456', 'client'],
    ['Thiam', 'Ousmane', 'ousmane.thiam@gmail.com', '702345678', '123456', 'client'],
    ['Diagne', 'Coumba', 'coumba.diagne@gmail.com', '703456789', '123456', 'client'],
    ['Faye', 'Abdoulaye', 'abdoulaye.faye@gmail.com', '704567890', '123456', 'client'],
    ['Seck', 'Ndeye', 'ndeye.seck@gmail.com', '705678901', '123456', 'client'],
    ['Ndour', 'Youssou', 'youssou.ndour@gmail.com', '706789012', '123456', 'client'],
    ['Cisse', 'Mamadou', 'mamadou.cisse@gmail.com', '707890123', '123456', 'client'],
    ['Toure', 'Rokhaya', 'rokhaya.toure@gmail.com', '708901234', '123456', 'client'],
    ['Diatta', 'Pape', 'pape.diatta@gmail.com', '709012345', '123456', 'client'],
    ['Mbaye', 'Astou', 'astou.mbaye@gmail.com', '761234567', '123456', 'client'],
    ['Wade', 'Alioune', 'alioune.wade@gmail.com', '762345678', '123456', 'client'],
    ['Sonko', 'Bineta', 'bineta.sonko@gmail.com', '763456789', '123456', 'client'],
    ['Camara', 'Lamine', 'lamine.camara@gmail.com', '764567890', '123456', 'client'],
    ['Diedhiou', 'Sokhna', 'sokhna.diedhiou@gmail.com', '765678901', '123456', 'client'],
];
foreach ($users as $u) {

    $hash = password_hash($u[4], PASSWORD_DEFAULT);

    insertUtilisateur($u[0], $u[1], $u[2], $u[3], $hash, $u[5]);
}
