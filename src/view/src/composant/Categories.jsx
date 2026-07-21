import { useContext } from "react";
import { CategorieContext } from "../context/categorieContext.jsx";

function AfficherCategorie({ categorie }) {
  const chemin = "/assets/categories/";
  // const chemin = "C:\xampp\htdocs\Boutique\src\view\public\assets\categories";
  {
    // console.log(chemin + categorie.chemin_fichier);
  }
  return (
    <div id={categorie.id_categorie} className="categorie-card">
      <img
        src={chemin + categorie.chemin_fichier}
        className="categorie-image"
        alt={categorie.nom_categorie}
      />
      <h3>{categorie.nom_categorie}</h3>
      <p>{categorie.description}</p>
    </div>
  );
}

function Categories() {
  const { categories } = useContext(CategorieContext);
  //   const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div className="categories">
      {/* {console.log(categories)} */}
      {categories.map((categorie) => {
        return (
          <AfficherCategorie
            key={categorie.id_categorie}
            categorie={categorie}
          />
        );
      })}
    </div>
  );
}

export default Categories;
