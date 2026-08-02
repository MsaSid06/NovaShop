import { useState, createContext } from "react";

const PanierContext = createContext();

function PanierContextProvider({ children }) {
  const [panier, setPanier] = useState([]);
  const [quantiteTab, setQuantiteTab] = useState([]);
  // const [newQTab, setNewQTabTab] = useState([]);
  // const [quantite, setQuantite] = useState(1);

  function AjoutAuPanier(product) {
    const existe = panier.some((p) => p.id_produit == product.id_produit);
    // ajoutQuantiteTab(product.id_produit, product.prix);
    if (!existe) {
      setPanier((prev) => [...prev, product]);
      ajoutQuantiteTab(product.id_produit, product.prix);
    }
    // console.log(panier);
  }
  //map renvoi un nouveau tableau
  // useEffect(() => {
  //   console.log(panier);

  //   console.log(quantiteTab);
  // }, [panier, quantiteTab]);

  function plusQuantite(id, stock, prix) {
    setQuantiteTab((prev) =>
      prev.map((q) => {
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
    const existe = quantiteTab.some((q) => q.idProduit == id);
    if (existe) {
      setQuantiteTab((prev) =>
        prev.map(
          (q) =>
            q.idProduit == id
              ? {
                  ...q,
                  quantite: Number(q.quantite) + 1,
                  total: Number(q.total) * (Number(q.quantite) + 1),
                }
              : q,
          // setNewQTabTab([...newQTab, q]);
        ),
      );
    } else {
      const value = { idProduit: id, quantite: 1, total: prixUnitaire };
      setQuantiteTab((prev) => [...prev, value]);
    }
  }

  function supprimerPanier(id) {
    setPanier((prev) => prev.filter((p) => p.id_produit != id));
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
