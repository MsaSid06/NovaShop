import "./ProductTable.css";
import { useState, useEffect, useContext } from "react";
// import { ProductContext } from "../context/ProductContext.jsx";
import { CategorieContext } from "../context/categorieContext.jsx";
import LocalContext from "../context/Localhost";
import CreateCategorie from "./CreateCategorie";

function CategorieTable() {
  const chemin = "/assets/categories/";

  const { categories } = useContext(CategorieContext);
  const { localhost } = useContext(LocalContext);
  const [categorieAffiche, setCategorieAffiche] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [aFaire, setAFaire] = useState(false);
  const [categorieUpdate, setCategorieUpdate] = useState(null);

  useEffect(() => {
    async function a() {
      setCategorieAffiche(categories);
    }
    a();
  }, [categories]);

  function searchCategories(event) {
    const value = event.target.value.toLowerCase();
    let filteredCategories = categories;
    filteredCategories = filteredCategories.filter((categorie) =>
      categorie.nom_categorie.toLowerCase().includes(value),
    );

    setCategorieAffiche(filteredCategories);
  }

  async function deleteCategorie(id, nom) {
    if (confirm(`Voulez-vous supprimer La categorie : ${nom} ?`)) {
      const data = {
        id_categorie: id,
      };

      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_categories.php`,
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
        result.message == 23000
          ? "Cette catégorie est utilisée dans un produit, vous ne pouvez pas la supprimer"
          : result.message
            ? "Catégorie supprimée avec succès"
            : "Veuillez réessayer",
      );
    }
  }
  // console.log(window.location.pathname);
  function updateCategorie(c) {
    setCategorieUpdate(c);
    // console.log(c);
    setShowCreate(true);
    setAFaire(true);
  }
  // console.log(categorie);
  return (
    <>
      <section className="produit-search">
        <div className="produit-wrapper">
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            onChange={searchCategories}
          />

          <button
            className="create-product-btn"
            onClick={() => {
              setAFaire(false);
              setCategorieUpdate(null);
              setShowCreate(true);
            }}
          >
            + Créer une catégorie
          </button>
        </div>
      </section>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Catégories</th>
              <th>Description</th>
              <th>DATE CREATION</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categorieAffiche.map((c) => (
              <tr key={c.id_categorie}>
                <td>
                  <div className="product-info">
                    <div className="product-image">
                      <img
                        src={chemin + c.chemin_fichier}
                        alt={c.nom_categorie}
                      />
                    </div>
                    <div>
                      <p className="product-name">{c.nom_categorie}</p>
                    </div>
                  </div>
                </td>

                <td className="price">{c.description}</td>

                <td>{c.date_creation}</td>

                <td>
                  <div className="actions">
                    <button>
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button onClick={() => updateCategorie(c)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        deleteCategorie(c.id_categorie, c.nom_categorie)
                      }
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
          <CreateCategorie
            action={aFaire}
            categorie={categorieUpdate}
            onClose={() => {
              setShowCreate(false);
              setCategorieUpdate(null);
              setAFaire(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default CategorieTable;
