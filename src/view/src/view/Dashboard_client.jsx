// import { useContext, useState } from "react";
// import AuthContext from "../context/Auth.jsx";
// import AfficherProduit from "../composant/AfficherProduit.jsx";
// import { ProductContext } from "../context/ProductContext.jsx";
// import Categories from "../composant/Categories.jsx";
// import Avis from "../composant/Avis.jsx";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import "./clien.css";

// function Dashboard_client() {
//   const { products } = useContext(ProductContext);
//   const { user } = useContext(AuthContext);

//   const [estConnecter, setEstConnecter] = useState(false);
//   useEffect(() => {
//     async function verif_connection() {
//       const response = await fetch(
//         "http://localhost/Boutique/src/controllers/est_connecter.php",
//       );
//       const resultat = await response.json();
//       setEstConnecter(resultat.connecter);
//     }
//     verif_connection();
//   }, []);

//   const navigate = useNavigate();
//   const produitPhare = products.slice(0, 3);
//   function redirect(lien) {
//     navigate(lien);
//   }
//   return (
//     <>
//       <div className="Dashboard_client">
//         <h1>{estConnecter}</h1>
//         {estConnecter && <h1>Bienvenue, {user?.nom}!</h1>}
//         {!estConnecter && <h1>Bienvenue sur notre boutique en ligne !</h1>}

//         <h1>Nos Differents Categories</h1>
//         <div id="categories">
//           <Categories />
//         </div>
//         <h1>Nos Produits Phares</h1>
//         {/* {console.log(produitPhare)} */}
//         <div>
//           {produitPhare.map((product) => (
//             <AfficherProduit key={product.id_produit} product={product} />
//           ))}
//         </div>

//         <button onClick={() => redirect("/produit")}>
//           Voir tous nos produits
//         </button>

//         <p>Quelques Avis sur nos produits</p>
//         <div id="avis">
//           <Avis />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard_client;

import { useContext, useState } from "react";
import AuthContext from "../context/Auth.jsx";
import AfficherProduit from "../composant/AfficherProduit.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import Categories from "../composant/Categories.jsx";
import Avis from "../composant/Avis.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LocalContext from "../context/Localhost.jsx";

function Dashboard_client() {
  const { products } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { localhost } = useContext(LocalContext);
  const [estConnecter, setEstConnecter] = useState(false);

  useEffect(() => {
    async function verif_connection() {
      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/est_connecter.php`,
      );
      const resultat = await response.json();
      setEstConnecter(resultat.connecter);
    }
    verif_connection();
  }, [localhost]);

  const navigate = useNavigate();
  const produitPhare = products.slice(0, 3);

  function redirect(lien) {
    navigate(lien);
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-hero">
          {estConnecter && <h1>Bienvenue, {user?.nom} !</h1>}

          {!estConnecter && <h1>Bienvenue sur notre boutique en ligne !</h1>}

          <p>
            Découvrez nos produits, nos catégories et les avis de nos clients.
          </p>
        </div>

        <section className="dashboard-section">
          <h2>Nos Différentes Catégories</h2>

          <div id="categories categorie-card">
            <Categories />
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Nos Produits Phares</h2>

          <div className="produits-phares">
            {produitPhare.map((product) => (
              <AfficherProduit key={product.id_produit} product={product} />
            ))}
          </div>

          <button className="btn-produits" onClick={() => redirect("/produit")}>
            Voir tous nos produits
          </button>
        </section>

        <section className="dashboard-section">
          <h2>Quelques Avis sur nos produits</h2>

          <div id="avis" className="avis-card">
            <Avis />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard_client;
