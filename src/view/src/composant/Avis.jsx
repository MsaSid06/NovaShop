import { useContext } from "react";
import { AvisContext } from "../context/AvisContext.jsx";

function Avis() {
  const { avis } = useContext(AvisContext);
  // INSERT INTO avis (id_utilisateur, note, commentaire) VALUES
  // (2,  5, 'Très belle robe, tissu de qualité et livraison rapide.')
  const avi = avis.slice(0, 3);
  return (
    <>
      <div className="notifs">
        {avi.map((a) => {
          return (
            <div key={a.id_avis} className="avis">
              <p className="nom">
                {a.prenom.charAt(0).toUpperCase() +
                  a.prenom.slice(1) +
                  " " +
                  a.nom.toUpperCase()}
              </p>
              <p className="note">{"★".repeat(Number(a.note))}</p>
              <span
                class="m-0 inline-flex items-center justify-center p-0 h-6 w-6 text-icon-information"
                data-namespace="@change/ds-icons"
                data-size="medium"
              ></span>
              <div className="message">{a.commentaire}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Avis;
