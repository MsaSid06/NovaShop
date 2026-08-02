import { useContext, useState, useEffect } from "react";
import { CommandeContext } from "../context/CommandeContext";
import LocalContext from "../context/Localhost";
import ListeLigneCommande from "./ListeLigneCommande";
import "./commande.css";

function ListeCommande() {
  const texte = "bonjour cher(e) client(e)\nvotre commande Novashop est prete.";
  const { commandes } = useContext(CommandeContext);
  const { localhost } = useContext(LocalContext);
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [CommandeAffiche, setCommandeAffiche] = useState([]);
  const [CommandeChoisis, setCommandeChoisis] = useState([]);

  const [ouvrir, setOuvrir] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setCommandeAffiche(commandes);
    }

    fetchData();
  }, [commandes]);

  async function modifierCommande(num, statut) {
    const data = {
      numero_commande: num,
      statut: statut,
    };
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/api_commande.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    alert(result.message);
  }
  async function SupprimerCommande(num) {
    const data = {
      numero_commande: num,
    };
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/api_commande.php`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    alert(result.message);
  }

  function filterstatut(statut) {
    setSelectedStatut(statut);
    if (statut != "all") {
      const filteredCommandes = commandes.filter((cmd) => cmd.statut == statut);
      setCommandeAffiche(filteredCommandes);
      return;
    }
    setCommandeAffiche(commandes);
  }

  function searchCommande(event) {
    if (selectedStatut == "all") {
      const filteredCommandes = commandes.filter(
        (cmd) =>
          cmd.numero_commande
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          cmd.date_livraison
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          cmd.telephone
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          cmd.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
          cmd.prenom.toLowerCase().includes(event.target.value.toLowerCase()),
      );
      setCommandeAffiche(filteredCommandes);
    } else {
      const filteredCommandes = commandes.filter(
        (cmd) =>
          (cmd.numero_commande
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
            cmd.telephone
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            cmd.date_livraison
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            cmd.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cmd.prenom
              .toLowerCase()
              .includes(event.target.value.toLowerCase())) &&
          cmd.id_categorie == selectedStatut,
      );
      setCommandeAffiche(filteredCommandes);
    }
  }

  async function details(commande) {
    await setCommandeChoisis(commande);
    await setOuvrir(true);
  }
  const nbCommandesValides = commandes.filter(
    (commande) => commande.statut === "Livrer",
  ).length;
  const nbCommandesAttente = commandes.filter(
    (commande) => commande.statut === "attente",
  ).length;
  const nbCommandesAnnulees = commandes.filter(
    (commande) => commande.statut === "Annuler",
  ).length;

  return (
    <>
      <div className="liste-commande">
        <div className="stat">
          <p id="cdm-valider">Commandes validées : {nbCommandesValides}</p>
          <p id="cdm-attente">Commandes en attente : {nbCommandesAttente}</p>
          <p id="cdm-annuler">Commandes annulées : {nbCommandesAnnulees}</p>
          <p id="cdm-total">Total : {commandes.length}</p>
        </div>
        <section className="filtre">
          <input
            id="text-filtre"
            type="text"
            placeholder="Rechercher une commande via (nom, prenom, num_commande, tel, date livraison...)"
            onChange={searchCommande}
          />

          <select
            name="statut"
            id="select-statut"
            onChange={(e) => filterstatut(e.target.value)}
          >
            <option value="all">Toutes les commandes</option>
            <option value="Livrer">Les commandes validées</option>
            <option value="Annuler">Les commandes Annulées</option>
            <option value="attente">Les commandes en attente</option>
          </select>
        </section>
        <section className="containers-commands">
          {CommandeAffiche.map((cmd) => (
            <div key={cmd.numero_commande} className="command-cards">
              <span className="avatar">
                {" "}
                {(cmd.nom[0] + cmd.prenom[0]).toUpperCase()}
              </span>
              <div className="info-command">
                <p id="num-cmd">{cmd.numero_commande}</p>
                <p id="statut" data-statut={cmd.statut}>
                  {cmd.statut}
                </p>
                <p id="profile">{cmd.nom + " " + cmd.prenom}</p>
                <p id="adresse-livraison">{cmd.adresse_livraison}</p>
                <p id="date-livraison">{cmd.date_livraison}</p>
              </div>
              <div className="cmd-action">
                <button type="button" id="watsapp">
                  <a
                    href={`https://wa.me/${cmd.telephone}?text{encodeURIComponent(${texte})}`}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Watsapp
                  </a>
                </button>
                <button
                  id="valider"
                  type="button"
                  onClick={() =>
                    modifierCommande(cmd.numero_commande, "Livrer")
                  }
                >
                  valider
                </button>
                <button
                  id="annuler"
                  type="button"
                  onClick={() =>
                    modifierCommande(cmd.numero_commande, "Annuler")
                  }
                >
                  Annuler
                </button>
                <button
                  id="supprimer"
                  type="button"
                  onClick={() => SupprimerCommande(cmd.numero_commande)}
                >
                  supprimer
                </button>
                <button id="detail" type="button" onClick={() => details(cmd)}>
                  details de la comande
                </button>
              </div>
            </div>
          ))}
        </section>

        <div className="details">
          {ouvrir && (
            <ListeLigneCommande
              numero={CommandeChoisis.numero_commande}
              commande={CommandeChoisis}
              setOuvrir={setOuvrir}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ListeCommande;
