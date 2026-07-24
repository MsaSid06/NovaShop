import "./AfficherProduit.css";
import { useEffect, useState } from "react";
import "./DetailsProduit";
import DetailsProduits from "./DetailsProduit";

export function AfficherProduit({ product, AjoutAuPanier }) {
  const chemin = "/assets/Produits/";
  const [veutVoir, setVeutVoir] = useState(false);
  // const [estDansLePanier, setEstDansLePanier] = useState(false);

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

  function VoirDetails() {
    // return <DetailsProduits product={product} AjoutAuPanier={AjoutAuPanier} />;
    setVeutVoir(true);
    console.log(veutVoir);
  }

  function fermer() {
    setVeutVoir(false);
  }

  return (
    <>
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
        <button onClick={VoirDetails}>Voir details</button>
        <button onClick={() => AjoutAuPanier(product)}>Ajouez au panier</button>
      </div>
      {veutVoir && (
        <DetailsProduits
          product={product}
          AjoutAuPanier={AjoutAuPanier}
          fermer={fermer}
        />
      )}
    </>
  );
}

export default AfficherProduit;
