import { useState, createContext } from "react";

const PanierContext = createContext();

function PanierContextProvider({ children }) {
  const [panier, setPanier] = useState([]);
  const [quantiteTab, setQuantiteTab] = useState([]);
  // const [quantite, setQuantite] = useState(1);

  function AjoutAuPanier(product) {
    setPanier([...panier, product]);
    ajoutQuantiteTab(product.id_produit, product.prix);
  }
  //map renvoi un nouveau tableau

  function plusQuantite(id, stock, prix) {
    setQuantiteTab(
      quantiteTab.map((q) => {
        if (q.idProduit == id) {
          const newQtite = q.quantite == stock ? q.quantite : q.quantite + 1;
          return {
            ...q,
            quantite: newQtite,
            total: (Number(newQtite) * Number(prix)).toFixed(2),
          };
        }
        return q;
      }),
    );
    console.log(quantiteTab);
  }

  function moinsQuantite(id, prix) {
    setQuantiteTab(
      quantiteTab.map((q) => {
        if (q.idProduit == id) {
          const newQtite = q.quantite > 1 ? q.quantite - 1 : q.quantite;
          return {
            ...q,
            quantite: newQtite,
            total: (Number(newQtite) * Number(prix)).toFixed(2),
          };
        }
        return q;
      }),
    );
  }
  function ajoutQuantiteTab(id, prixUnitaire) {
    const value = { idProduit: id, quantite: 1, total: prixUnitaire };
    setQuantiteTab([...quantiteTab, value]);
  }

  function supprimerPanier(id) {
    setPanier(panier.filter((p) => p.id_produit != id));
  }
  return (
    <PanierContext.Provider
      value={{
        AjoutAuPanier,
        plusQuantite,
        moinsQuantite,
        supprimerPanier,
        panier,
        quantiteTab,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export { PanierContextProvider, PanierContext };
