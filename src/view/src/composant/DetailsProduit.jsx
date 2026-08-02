import "./AfficherProduit.css";

import "./Details.css";

function DetailsProduits({ product, AjoutAuPanier, fermer }) {
  const chemin = "/assets/Produits/";

  return (
    <div className="details-overlay">
      <section className="detail-card">
        <button className="close-btn" onClick={fermer}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>

        <div id={product.id_produit} className="details-content">
          <div className="details-image-container">
            <img
              src={chemin + product.chemin_fichier}
              className="details-image"
              alt={product.nom_produit}
            />
          </div>

          <div className="details-info">
            <h2>{product.nom_produit}</h2>
            <p className="details-category">
              Catégorie : {product.nom_categorie}
            </p>
            <p className="details-description">{product.description}</p>
            <p className="details-price">Prix : {product.prix} FCFA</p>
            <p>Stock : {product.stock_actuel}</p>

            <div className="details-buttons">
              <button onClick={() => AjoutAuPanier(product)}>
                Ajoutez au panier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailsProduits;
