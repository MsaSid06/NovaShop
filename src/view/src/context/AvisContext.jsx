import { createContext, useState, useEffect, useContext } from "react";
import LocalContext from "./Localhost";
const AvisContext = createContext();

function AvisContextProvider({ children }) {
  const [avis, setAvis] = useState([]);
  const { localhost } = useContext(LocalContext);
  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_avis.php`,
        );
        const data = await response.json();
        setAvis(data);
      } catch (error) {
        console.error("Error fetching Avis:", error);
      }
    };
    fetchAvis();
  }, [localhost]);

  return (
    <AvisContext.Provider value={{ avis }}>{children}</AvisContext.Provider>
  );
}

export { AvisContext, AvisContextProvider };
