import { useContext, useState, useEffect } from "react";
import { AvisContext } from "../context/AvisContext.jsx";
import LocalContext from "../context/Localhost";
import "./CSS/Avis.css";

function AvisTable() {
  const { avis } = useContext(AvisContext);
  const { localhost } = useContext(LocalContext);
  // console.log(avis);
  // const avi = avis.filter((a) => a.status == "Attente");
  const avi = avis.sort((a, b) => b.note - a.note);
  // console.log(avi);
  const [avisAffiche, setAvisAffiche] = useState([]);
  useEffect(() => {
    async function a() {
      setAvisAffiche(avi);
    }
    a();
  }, [avi]);
  function searchUser(event) {
    const value = event.target.value.toLowerCase().trim();

    let filteredAvis = avi;

    filteredAvis = filteredAvis.filter((a) =>
      a.nom.toLowerCase().includes(value),
    );

    setAvisAffiche(filteredAvis);
  }

  async function handleValider(id) {
    if (confirm("Voulez-vous valider cet avis?")) {
      try {
        const data = {
          id_avis: id,
        };
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_avis.php`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        const result = await response.json();
        // setAvis(data);
        alert(
          result.message ? "Avis validé avec succès" : "Veuillez réessayer",
        );
      } catch (error) {
        console.error("Error fetching Avis:", error);
      }
    }
  }
  async function handleSupprimer(id) {
    if (confirm("Voulez-vous supprimer cet avis?")) {
      try {
        const data = {
          id_avis: id,
        };
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_avis.php`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        const result = await response.json();
        // setAvis(data);
        alert(
          result.message ? "Avis supprimé avec succès" : "Veuillez réessayer",
        );
      } catch (error) {
        console.error("Error fetching Avis:", error);
      }
    }
  }
  return (
    <div className="avis-table-container">
      <section className="produit-search">
        <div className="produit-wrapper">
          <input
            type="text"
            placeholder="Rechercher un avis..."
            onChange={searchUser}
          />
        </div>
      </section>
      <div className="avis-container">
        {avisAffiche.length === 0 && (
          <p className="avis-empty">Aucun avis trouvé.</p>
        )}
        {avisAffiche.map((a) => {
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

                  <p className="avis-note-p">
                    {"★".repeat(Number(a.note))} <br />
                    <span
                      className={`avis-statut ${a.status === "Traiter" ? "Traiter" : "Attente"}`}
                    >
                      {a.status}
                    </span>
                  </p>
                </div>
              </div>
              <p className="avis-message">{a.commentaire}</p>
              <p className="avis-date">{a.date_creation}</p>
              <div className="avis-actions">
                {a.status == "Attente" && (
                  <button
                    className="avis-button valider"
                    onClick={() => handleValider(a.id_avis)}
                  >
                    Valider
                  </button>
                )}
                <button
                  className="avis-button supprimer"
                  onClick={() => handleSupprimer(a.id_avis)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvisTable;
