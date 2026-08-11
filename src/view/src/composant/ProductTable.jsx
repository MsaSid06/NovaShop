import "./CSS/ProductTable.css";
import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import { CategorieContext } from "../context/categorieContext.jsx";
import LocalContext from "../context/Localhost";
import CreateProduct from "./CreateProduct.jsx";

function ProductTable() {
  const chemin = "/assets/Produits/";

  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategorieContext);
  const { localhost } = useContext(LocalContext);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [produitAffiche, setProduitAffiche] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [aFaire, setAFaire] = useState(false);
  const [produitUpdate, setProduitUpdate] = useState(null);

  useEffect(() => {
    async function a() {
      setProduitAffiche(products);
    }
    a();
  }, [products]);

  function filterByCategory(categoryId) {
    setSelectedCategory(categoryId);

    if (categoryId !== "all") {
      const filteredProducts = products.filter(
        (product) => product.id_categorie == categoryId,
      );

      setProduitAffiche(filteredProducts);
      return;
    }

    setProduitAffiche(products);
  }

  function searchProducts(event) {
    const value = event.target.value.toLowerCase();

    let filteredProducts = products;

    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (produit) => produit.id_categorie == selectedCategory,
      );
    }

    filteredProducts = filteredProducts.filter((produit) =>
      produit.nom_produit.toLowerCase().includes(value),
    );

    setProduitAffiche(filteredProducts);
  }

  async function deleteProduct(id, nom) {
    if (confirm(`Voulez-vous supprimer : ${nom} ?`)) {
      const data = {
        id_produit: id,
      };

      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_produits.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      alert(
        result.message ? "Produit supprimé avec succès" : "Veuillez réessayer",
      );
    }
  }
  console.log(window.location.pathname);
  function updateProduit(p) {
    setProduitUpdate(p);
    // console.log(p);
    setShowCreate(true);
    setAFaire(true);
  }
  // console.log(products);

  return (
    <>
      <section className="produit-search">
        <div className="produit-wrapper">
          <div className="categorie-select">
            <select
              name="categorie"
              id="categories"
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

          <button
            className="create-product-btn"
            onClick={() => {
              setAFaire(false);
              setProduitUpdate(null);
              setShowCreate(true);
            }}
          >
            + Créer un produit
          </button>
        </div>
      </section>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Produits</th>
              <th>Catégories</th>
              <th>Prix</th>
              <th>Stock</th>
              {/* <th>Score</th> */}
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {produitAffiche.map((p) => (
              <tr key={p.id_produit}>
                <td>
                  <div className="product-info">
                    <div className="product-image">
                      <img
                        src={chemin + p.chemin_fichier}
                        alt={p.nom_produit}
                      />
                    </div>
                    <div>
                      <p className="product-name">{p.nom_produit}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="category-badge">{p.nom_categorie}</span>
                </td>

                <td className="price">{p.prix}</td>

                <td>{p.stock_actuel}</td>

                <td>
                  <span className="status active">{p.statut}</span>
                </td>

                <td>
                  <div className="actions">
                    <button>
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button onClick={() => updateProduit(p)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteProduct(p.id_produit, p.nom_produit)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showCreate && (
          <CreateProduct
            product={produitUpdate}
            action={aFaire}
            onClose={() => {
              setShowCreate(false);
              setProduitUpdate(null);
              setAFaire(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default ProductTable;
