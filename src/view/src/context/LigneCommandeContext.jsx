import { createContext, useState, useEffect, useContext } from "react";
import LocalContext from "./Localhost";
const LigneCommandeContext = createContext();

function LigneCommandeContextProvider({ children }) {
  const [lignecommandes, setLigneCommandes] = useState([]);
  const { localhost } = useContext(LocalContext);
  useEffect(() => {
    const fetchLigneCommande = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_lignecommande.php`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setLigneCommandes(data);
      } catch (error) {
        console.error("Error fetching Ligne commandes:", error);
      }
    };
    fetchLigneCommande();
  }, [localhost]);

  return (
    <LigneCommandeContext.Provider value={{ lignecommandes }}>
      {children}
    </LigneCommandeContext.Provider>
  );
}

export { LigneCommandeContext, LigneCommandeContextProvider };
