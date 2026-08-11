import { createContext, useState, useEffect, useContext } from "react";
import LocalContext from "./Localhost";
const CommandeContext = createContext();

function CommandeContextProvider({ children }) {
  const [commandes, setCommandes] = useState([]);
  const { localhost } = useContext(LocalContext);
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_commande.php`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setCommandes(data);
      } catch (error) {
        console.error("Error fetching commandes:", error);
      }
    };
    fetchCommande();
  }, [localhost]);

  return (
    <CommandeContext.Provider value={{ commandes }}>
      {children}
    </CommandeContext.Provider>
  );
}

export { CommandeContext, CommandeContextProvider };
