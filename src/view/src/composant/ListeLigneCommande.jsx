import { LigneCommandeContext } from "../context/LigneCommandeContext.jsx";
import { useContext } from "react";
import "./commande.css";

function ListeLigneCommande({ numero, commande, setOuvrir }) {
  const { lignecommandes } = useContext(LigneCommandeContext);
  const texte = "bonjour cher(e) client(e)\nvotre commande Novashop est prete.";
  return (
    <section className="containers-commands">
      <div className="command-details-cards">
        <div className="info-static">
          <div className="info-command">
            <p id="num-cmd">COMMANDE : {commande.numero_commande}</p>
            {/* <p id="statut" data-statut={commande.statut}>
              {commande.statut}
            </p> */}
            <button className="fermer" onClick={() => setOuvrir(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <hr />
          </div>
          <p id="adresse-livraison">{commande.adresse_livraison}</p>
          <p id="date-livraison">{commande.date_livraison}</p>
          <div className="info-client">
            <span className="avatar">
              {" "}
              {(commande.nom[0] + commande.prenom[0]).toUpperCase()}
            </span>
            <p id="profile">
              {commande.nom.toUpperCase() + " " + commande.prenom.toUpperCase()}
              <br />
              <span className="tel">
                <i className="fa-solid fa-phone"></i>
                {commande.telephone}
              </span>
            </p>
            <p className="statut" data-statut={commande.statut}>
              {commande.statut}
            </p>
          </div>
          <div className="cmd-action">
            <button type="button" id="watsapp">
              <a
                href={`https://wa.me/${commande.telephone}?text{encodeURIComponent(${texte})}`}
              >
                <i className="fa-brands fa-whatsapp"></i> Contacter le client
              </a>
            </button>
          </div>
        </div>
        {/* {console.log(lignecommandes)} */}
        {lignecommandes.map((ligne) => {
          if (numero == ligne.numero_commande) {
            return (
              <div key={ligne.id_ligne_commande} className="ligne-produit">
                <span className="logo">
                  <i className="fa-solid fa-box"></i>
                </span>
                <div className="info-produit">
                  <p className="produit">Produit : {ligne.nom_produit}</p>
                  <p className="quantite-produit">
                    Quantite : {ligne.quantite}
                  </p>
                  <p className="prix-total-produit">
                    P. Unitaire :{" "}
                    {(Number(ligne.prix) * Number(ligne.quantite)).toFixed(2) +
                      " FCFA"}
                  </p>
                </div>
              </div>
            );
          }
        })}
        <div className="prix-total">
          <p className="prix"> Total </p>
          <p className="total">
            {" "}
            {(
              lignecommandes
                .filter((ligne) => ligne.numero_commande == numero)
                .reduce(
                  (total, ligne) =>
                    total + Number(ligne.prix) * Number(ligne.quantite),
                  0,
                ) + 1000
            ).toFixed(2) + " FCFA"}
          </p>
        </div>
        <div className="livraison">
          <p>
            <i class="fa-solid fa-map-location-dot"></i>Adresse de
            livraison{" "}
          </p>{" "}
          <p className="adresse">{" " + commande.adresse_livraison}</p>
        </div>
      </div>
    </section>
  );
}
export default ListeLigneCommande;
