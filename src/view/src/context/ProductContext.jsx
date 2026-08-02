import { createContext, useEffect, useState, useContext } from "react";
import LocalContext from "./Localhost";
const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const { localhost } = useContext(LocalContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_produits.php`,
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [localhost]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductContextProvider };
