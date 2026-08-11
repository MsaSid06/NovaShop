import "./CSS/StatsByCategories.css";
// import { categorieContext } from "../context/CategorieContext.jsx";
import { useEffect, useState, useContext } from "react";
import LocalContext from "../context/Localhost";
// const CategorieContext = createContext();

export default function StatsByCategories() {
  const { localhost } = useContext(LocalContext);
  const [categoriesRevenus, setCategoriesRevenus] = useState([]);
  const [maxRevenue, setMaxRevenue] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_revenusCat.php`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const retour = await response.json();
        setCategoriesRevenus(retour);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [localhost]);

  useEffect(() => {
    async function a() {
      setMaxRevenue(
        Math.max(
          ...categoriesRevenus.map((cat) => Number(cat.total_revenueCat)),
        ),
      );
    }
    a();
  }, [categoriesRevenus]);

  const colors = [
    "#2563eb", // bleu
    "#10b981", // vert
    "#f59e0b", // orange
    "#ef4444", // rouge
    "#8b5cf6", // violet
    "#ec4899", // rose
    "#06b6d4", // cyan
    "#84cc16", // vert clair
  ];
  return (
    <div className="stats-category">
      <div className="stats-category-header">
        <h3>Revenue by Category</h3>
        <p>December 2024</p>
      </div>

      {/* {console.log(categoriesRevenus)} */}

      {categoriesRevenus.map((category, index) => {
        const percentage =
          (Number(category.total_revenueCat) / maxRevenue) * 100;
        return (
          <div className="category" key={category.nom_categorie}>
            <div className="category-header">
              <span>{category.nom_categorie ?? null}</span>
              <span>
                {category.total_revenueCat?.toLocaleString() ?? null} FCFA
              </span>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
