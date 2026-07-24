import { useContext } from "react";
import { AvisContext } from "../context/AvisContext.jsx";
import "./Avis.css";

function Avis() {
  const { avis } = useContext(AvisContext);

  const avi = avis.slice(0, 3);

  return (
    <div className="avis-container">
      {avi.map((a) => {
        return (
          <div key={a.id_avis} className="avis-card">
            <div className="avis-header">
              <div className="avis-avatar">
                {(a.nom[0] + a.prenom[0]).toUpperCase()}
              </div>

              <div>
                <p className="avis-nom">
                  {a.prenom.charAt(0).toUpperCase() +
                    a.prenom.slice(1) +
                    " " +
                    a.nom.toUpperCase()}
                </p>

                <p className="avis-note">{"★".repeat(Number(a.note))}</p>
              </div>
            </div>

            <p className="avis-message">{a.commentaire}</p>
            <p className="avis-date">{a.date_creation}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Avis;
