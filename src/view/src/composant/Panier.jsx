import { useContext } from "react";
import { PanierContext } from "../context/PanierContext";
import AuthContext from "../context/Auth.jsx";
import { useNavigate } from "react-router-dom";

function Panier() {
  const { plusQuantite } = useContext(PanierContext);
  const { moinsQuantite } = useContext(PanierContext);
  const { supprimerPanier } = useContext(PanierContext);
  const { quantiteTab } = useContext(PanierContext);
  const { panier } = useContext(PanierContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const panierFiltrer = panier.filter(
    (pn, index, tableau) =>
      index === tableau.findIndex((p) => p.id_produit === pn.id_produit),
  );
  const quantiteTabFilter = quantiteTab.filter(
    (q, index, tableau) =>
      index === tableau.findIndex((p) => p.idProduit === q.idProduit),
  );
  // const [text, setText] = useState(
  //   "Bonjour ! Je souhaite passer une commande.",
  // );
  let prixTotal = 0;
  let i = 1;
  // const [qtite, setQtite] = useState(0);
  // const [prix_total, setPrix_total] = useState(0);
  function commander() {
    const numero = "221785823683";
    const numeroCommande = "CM01";
    let message = `Bonjour NovaShop ! Je souhaite passer une commande.
      ========${numeroCommande}========== 
    `; //le generer auto
    panier.forEach((p) => {
      const nom_produit = p.nom_produit;
      const id_produit = p.id_produit;
      quantiteTab.forEach((q) => {
        if (q.idProduit == id_produit) {
          // setPrix_total(q.total);
          // setQtite(q.quantite);
          // setText((ancienText) => {
          message += `  
Produit ${i++} : ${nom_produit}
Quantite : ${q.quantite}
Prix : ${q.total}
            -----------
            `;
          // });
          prixTotal += Number(q.total);
        }
      });
    });

    message += `  
       Total : ${prixTotal} FCFA
      ========================
            `;
    const lienWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

    window.open(lienWhatsApp, "_blank", "noopener,noreferrer");
  }
  // console.log(quantiteTabFilter);
  function Passercommander() {
    if (user?.nom) {
      commander();
    } else {
      alert("Veuillez vous connecter d'abord !");
      navigate("/login");
    }
  }
  return (
    
    <section className="bg-slate-950 py-10 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Panier ({panierFiltrer.length})
          </h1>

          {panier.length > 0 && (
            <button
              onClick={Passercommander}
              className="
            bg-green-600
            hover:bg-green-500
            text-white
            px-5 py-3
            rounded-xl
            font-semibold
            transition
            shadow-lg
            hover:-translate-y-1
            "
            >
              <i className="fa-brands fa-whatsapp"></i> Commander
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LISTE PRODUITS */}

          <div className="lg:col-span-2 space-y-5">
            {panierFiltrer.map((produit) => (
              <div
                key={produit.id_produit}
                className="
            bg-slate-900
            border border-slate-700
            rounded-2xl
            p-5
            shadow-xl
            transition
            hover:-translate-y-1
            hover:shadow-2xl
            "
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <img
                    src={"/assets/Produits/" + produit.chemin_fichier}
                    alt={produit.nom_produit}
                    className="
                w-full
                md:w-32
                h-32
                object-contain
                bg-slate-800
                rounded-xl
                p-3
                "
                  />

                  <div className="flex-1">
                    <h3
                      className="
                text-xl
                font-bold
                text-white
                "
                    >
                      {produit.nom_produit}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Prix unitaire :
                      <span className="text-blue-400 font-semibold">
                        {" "}
                        {produit.prix} FCFA
                      </span>
                    </p>

                    <p className="text-slate-400">
                      Stock : {produit.stock_actuel}
                    </p>

                    {/* QUANTITE */}

                    <div className="flex items-center gap-4 mt-5">
                      <button
                        onClick={() =>
                          moinsQuantite(produit.id_produit, produit.prix)
                        }
                        className="
                  w-10 h-10
                  rounded-lg
                  bg-slate-700
                  text-white
                  text-xl
                  hover:bg-blue-600
                  transition
                  "
                      >
                        -
                      </button>

                      <span
                        className="
                  text-white
                  font-bold
                  text-lg
                  "
                      >
                        {quantiteTabFilter.map((q) =>
                          q.idProduit == produit.id_produit ? q.quantite : "",
                        )}
                      </span>

                      <button
                        onClick={() =>
                          plusQuantite(
                            produit.id_produit,
                            produit.stock_actuel,
                            produit.prix,
                          )
                        }
                        className="
                  w-10 h-10
                  rounded-lg
                  bg-blue-600
                  text-white
                  text-xl
                  hover:bg-blue-500
                  transition
                  "
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p
                      className="
                text-blue-400
                font-bold
                text-xl
                "
                    >
                      {quantiteTabFilter.find(
                        (q) => q.idProduit == produit.id_produit,
                      )?.total || produit.prix}{" "}
                      FCFA
                    </p>

                    <button
                      onClick={() => {
                        supprimerPanier(produit.id_produit);
                      }}
                      className="
                mt-5
                text-red-400
                hover:text-red-300
                transition
                "
                    >
                      <i className="fa-solid fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RESUME COMMANDE */}

          <div
            className="
        bg-slate-900
        border border-slate-700
        rounded-2xl
        p-6
        h-fit
        shadow-xl
        "
          >
            <h2
              className="
          text-xl
          text-white
          font-bold
          mb-6
          "
            >
              Résumé commande
            </h2>

            <div
              className="
          flex
          justify-between
          text-slate-300
          border-b
          border-slate-700
          pb-4
          "
            >
              <span>Produits</span>

              <span>{panierFiltrer.length}</span>
            </div>

            <div
              className="
          flex
          justify-between
          text-white
          font-bold
          text-xl
          mt-5
          "
            >
              <span>Total</span>

              <span className="text-blue-400">
                {quantiteTabFilter.reduce((acc, q) => acc + Number(q.total), 0)}
                FCFA
              </span>
            </div>

            <button
              onClick={Passercommander}
              className="
          w-full
          mt-6
          bg-blue-600
          hover:bg-blue-500
          text-white
          py-3
          rounded-xl
          font-semibold
          transition
          hover:-translate-y-1
          shadow-lg
          "
            >
              Commander maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Panier;
