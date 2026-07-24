// import "./AfficherProduit.css";

import "./DetailsCat.css";

function DetailsCategories({ categorie, fermer }) {
  const chemin = "/assets/categories/";

  return (
    <div className="details-overlay">
      <section className="details-card">
        <a href="#" className="categories-card">
          <button className="close-btn" onClick={fermer}>
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
          <img
            src={chemin + categorie.chemin_fichier}
            className="categories-image"
            alt={categorie.nom_categorie}
          />

          <div className="categories-content">
            <h3>{categorie.nom_categorie}</h3>

            <p>{categorie.description}</p>
          </div>
        </a>
      </section>
    </div>
  );
}

export default DetailsCategories;
