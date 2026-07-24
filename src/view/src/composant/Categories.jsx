import { useContext, useState } from "react";
import { CategorieContext } from "../context/categorieContext.jsx";
import DetailsCategories from "./DetailsCategories.jsx";
import "./Categories.css";
function Categories() {
  const [veutVoir, setVeutVoir] = useState(false);
  const [select, setSelect] = useState(null);
  async function VoirDetails(categorie) {
    // return <DetailsProduits product={product} AjoutAuPanier={AjoutAuPanier} />;
    setVeutVoir(true);
    setSelect(categorie);
    console.log(veutVoir);
    console.log(select);
  }

  function fermer() {
    setVeutVoir(false);
  }

  function AfficherCategorie({ categorie }) {
    const chemin = "/assets/categories/";

    return (
      <div href="#" className="categorie-card">
        <img
          src={chemin + categorie.chemin_fichier}
          className="categorie-image"
          alt={categorie.nom_categorie}
        />

        <div className="categorie-content">
          <h3>{categorie.nom_categorie}</h3>

          <p>{categorie.description}</p>

          <button type="button" onClick={() => VoirDetails(categorie)}>
            Voir les détails
            <span> → </span>
          </button>
        </div>
      </div>
    );
  }

  const { categories } = useContext(CategorieContext);

  return (
    <div className="categories">
      {categories.map((categorie) => {
        return (
          <AfficherCategorie
            key={categorie.id_categorie}
            categorie={categorie}
          />
        );
      })}
      {veutVoir && <DetailsCategories categorie={select} fermer={fermer} />}
    </div>
  );
}

export default Categories;
