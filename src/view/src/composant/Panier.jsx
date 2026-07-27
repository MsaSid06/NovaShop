import { useContext, useState } from "react";
import { PanierContext } from "../context/PanierContext";
import AuthContext from "../context/Auth.jsx";
import { useNavigate } from "react-router-dom";
import LocalContext from "../context/Localhost.jsx";

function Panier() {
  const { plusQuantite } = useContext(PanierContext);
  const { moinsQuantite } = useContext(PanierContext);
  const { supprimerPanier } = useContext(PanierContext);
  const { quantiteTab } = useContext(PanierContext);
  const { panier } = useContext(PanierContext);
  const { user } = useContext(AuthContext);
  const { localhost } = useContext(LocalContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adresse_livraison: "",
    frais_livraison: 1000,
    date_livraison: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Passercommander();
    setShowForm(false);
  };
  function formatDateBloc() {
    const date = new Date();

    return (
      "CM" +
      user?.id_utilisateur +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      String(date.getMonth() + 1).padStart(2, "0") +
      date.getFullYear() +
      "-" +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0")
    );
  }

  const quantiteTabFilter = quantiteTab.filter(
    (q, index, tableau) =>
      index === tableau.findIndex((p) => p.idProduit === q.idProduit),
  );

  let prixTotal = 0;
  let i = 1;

  async function commander() {
    console.log(formatDateBloc());
    // const numero = "221785823683";
    const numeroCommande = formatDateBloc();
    const d = new Date();
    const date =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0") +
      " " +
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0") +
      ":" +
      String(d.getSeconds()).padStart(2, "0");
    const can = await enregistrerCommande(numeroCommande, date, "attente");

    // console.log(panier);
    let facture = `Bonjour NovaShop ! Je souhaite passer une commande.\n
Commande : ${numeroCommande}\n
Client : ${(user?.prenom + " " + user?.nom).toUpperCase()}\n
    `;
    console.log(can);
    if (can) {
      let nbLigne = 0;
      for (const p of panier) {
        const nom_produit = p.nom_produit;
        const id_produit = p.id_produit;
        let quantite;
        quantiteTabFilter.forEach((q) => {
          if (q.idProduit == id_produit) {
            quantite = q.quantite;
            facture += `  
            Produit ${i++} : ${nom_produit}
  Quantite : ${q.quantite}
  Prix : ${q.total}
            -----------
            `;
            prixTotal += Number(q.total);
          }
        });
        nbLigne += await enregistrerLigneCommande(
          numeroCommande,
          id_produit,
          quantite,
        );
      }

      if (panier.length == nbLigne) {
        alert(
          "Votre commande a bien été recues, et est en cours de traitement.\nMerci !",
        );
      } else {
        alert("Veuillez recommencer, une erreure s'est produite.");
      }
      facture += `  
      Total : ${prixTotal} FCFA
      ========================
      `;
      console.log(facture);

      // const lienWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(facture)}`;
      // console.log(facture);

      // window.open(lienWhatsApp, "_blank", "noopener,noreferrer");
    } else {
      alert("Veuillez repasser la commande, une erreur est survenue.");
    }
  }
  async function enregistrerCommande(num, date, statut) {
    const data = {
      numero_commande: num,
      date_commande: date,
      adresse_livraison: formData.adresse_livraison,
      statut: statut,
      frais_livraison: formData.frais_livraison,
      date_livraison: formData.date_livraison,
      id_client: user?.id_utilisateur,
    };
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/api_commande.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const retour = await response.json();
    console.log(retour.message);
    if (retour.message) {
      return true;
    } else {
      alert("Veuillez repasser la commande.");
      return false;
    }
  }
  async function enregistrerLigneCommande(num, id, qt) {
    const data = {
      numero_commande: num,
      id_produit: id,
      quantite: qt,
    };
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/api_ligneCommande.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (result.message) {
      // await setLigneCommande((prev) => prev + 1);
      return 1;
    } else {
      return -1;
      // await setLigneCommande((prev) => prev - 1);
    }
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
            Panier ({panier.length})
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LISTE PRODUITS */}
          <div className="lg:col-span-2 space-y-5">
            {panier.map((produit) => (
              <div
                key={produit.id_produit}
                className=" bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl "
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <img
                    src={"/assets/Produits/" + produit.chemin_fichier}
                    alt={produit.nom_produit}
                    className=" w-full md:w-32 h-32 object-contain bg-slate-800 rounded-xl p-3 "
                  />

                  <div className="flex-1">
                    <h3 className=" text-xl font-bold text-white ">
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
                        className=" w-10 h-10 rounded-lg bg-slate-700 text-white text-xl hover:bg-blue-600 transition "
                      >
                        -
                      </button>

                      <span className=" text-white font-bold text-lg ">
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
                        className=" w-10 h-10 rounded-lg bg-blue-600 text-white text-xl hover:bg-blue-500 transition "
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className=" text-blue-400 font-bold text-xl ">
                      {quantiteTabFilter.find(
                        (q) => q.idProduit == produit.id_produit,
                      )?.total || produit.prix}{" "}
                      FCFA
                    </p>

                    <button
                      onClick={() => {
                        supprimerPanier(produit.id_produit);
                      }}
                      className=" mt-5 text-red-400 hover:text-red-300 transition "
                    >
                      <i className="fa-solid fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RESUME COMMANDE */}

          <div className=" bg-slate-900 border border-slate-700 rounded-2xl p-6 h-fit shadow-xl ">
            <h2 className=" text-xl text-white font-bold mb-6 ">
              Résumé commande
            </h2>

            <div className=" flex justify-between text-slate-300 border-b border-slate-700 pb-4 ">
              <span>Produits</span>
              <span>{panier.length}</span> <br />
              <span> Livraison : 1000 FCFA </span>
            </div>

            <div className=" flex justify-between text-white font-bold text-xl mt-5 ">
              <br />

              <span>Total</span>

              <span className="text-blue-400">
                {quantiteTabFilter.reduce(
                  (acc, q) => acc + Number(q.total),
                  0,
                ) + 1000}
                FCFA
              </span>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className=" w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition hover:-translate-y-1 shadow-lg "
            >
              Commander maintenant
            </button>
          </div>
        </div>
      </div>
      {/* Formlaire commande  */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              Informations de livraison
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  Adresse de livraison
                </label>

                <textarea
                  name="adresse_livraison"
                  value={formData.adresse_livraison}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Date de livraison souhaitée
                </label>

                <input
                  type="date"
                  name="date_livraison"
                  value={formData.date_livraison}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                  // onClick={Passercommander}
                >
                  Passer la commande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Panier;
