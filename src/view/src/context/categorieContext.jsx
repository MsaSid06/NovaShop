import { createContext, useEffect, useState, useContext } from "react";
import LocalContext from "./Localhost";
const CategorieContext = createContext();

function CategorieContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const { localhost } = useContext(LocalContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_categories.php`,
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [localhost]);

  return (
    <CategorieContext.Provider value={{ categories }}>
      {children}
    </CategorieContext.Provider>
  );
}

export { CategorieContext, CategorieContextProvider };
