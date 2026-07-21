import "./AfficherProduit.css";
import { useEffect } from "react";

export function AfficherProduit({ product, AjoutAuPanier }) {
  const chemin = "/assets/Produits/";
  useEffect(() => {
    const cards = document.querySelectorAll(".produit-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  return (
    <div id={product.id_produit} className="produit-card">
      <img
        src={chemin + product.chemin_fichier}
        className={product.nom_produit}
        alt={product.nom_produit}
      />
      <h3>{product.nom_produit}</h3>
      <p>Catégorie: {product.nom_categorie}</p>
      <p>{product.description}</p>
      <p>Prix: {product.prix} FCFA</p>
      <p>Stock: {product.stock_actuel}</p>
      <button>Voir details</button>
      <button onClick={() => AjoutAuPanier(product)}>Ajouez au panier</button>
    </div>
  );
}

export default AfficherProduit;
