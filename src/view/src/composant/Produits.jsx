import { useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import { CategorieContext } from "../context/categorieContext.jsx";
import { useContext } from "react";
import AfficherProduit from "./AfficherProduit.jsx";
import { PanierContext } from "../context/PanierContext.jsx";
import "./Produits.css";

function Produits() {
  const { AjoutAuPanier } = useContext(PanierContext);

  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategorieContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [produitAffiche, setProduitAffiche] = useState([]);

  useEffect(() => {
    setProduitAffiche(products);
  }, [products]);

  function filterByCategory(categoryId) {
    setSelectedCategory(categoryId);
    if (categoryId != "all") {
      const filteredProducts = products.filter(
        (product) => product.id_categorie == categoryId,
      );
      setProduitAffiche(filteredProducts);
      return;
    }
    setProduitAffiche(products);
  }

  function searchProducts(event) {
    if (selectedCategory == "all") {
      const filteredProducts = products.filter((produit) =>
        produit.nom_produit.includes(event.target.value),
      );
      setProduitAffiche(filteredProducts);
    } else {
      const filteredProducts = products.filter(
        (produit) =>
          produit.nom_produit.includes(event.target.value) &&
          produit.id_categorie == selectedCategory,
      );
      setProduitAffiche(filteredProducts);
    }
  }

  return (
    <section className="produits-page">
      <div className="produits-wrapper">
        <div className="categorie">
          <select
            name="categorie"
            id="categorie"
            onChange={(e) => filterByCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((categorie) => (
              <option
                key={categorie.id_categorie}
                value={categorie.id_categorie}
              >
                {categorie.nom_categorie}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Rechercher un produit..."
          onChange={searchProducts}
        />

        <div className="produits-container">
          {produitAffiche.map((product) => {
            return (
              <AfficherProduit
                key={product.id_produit}
                product={product}
                AjoutAuPanier={AjoutAuPanier}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Produits;
