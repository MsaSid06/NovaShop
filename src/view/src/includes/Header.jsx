import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PanierContext } from "../context/PanierContext";
import AuthContext from "../context/Auth";

function Header() {
  const { panier } = useContext(PanierContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [estConnecter, setEstConnecter] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function verif_connection() {
      const response = await fetch(
        "http://localhost/Boutique/src/controllers/est_connecter.php",
      );
      const resultat = await response.json();
      setEstConnecter(resultat.connecter);
    }
    verif_connection();
  }, [user]);

  function redirect(lien) {
    navigate(lien);
    setMenuOpen(false);
  }

  function allerVers(id) {
    if (location.pathname !== "/") {
      redirect("/#" + id);
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    } else {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <header className="header">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => redirect("/")}>
          <i className="fa-solid fa-shop"></i>
          <span>NovaShop</span>
        </div>

        {}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <i
            className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
          ></i>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => redirect("/")}>
              <i className="fa-solid fa-house"></i> Accueil
            </li>

            <li onClick={() => redirect("/produit")}>
              <i className="fa-solid fa-bag-shopping"></i> Produit
            </li>

            <li onClick={() => allerVers("footer")}>
              <i className="fa-solid fa-envelope"></i> Contact
            </li>

            <li onClick={() => allerVers("avis")}>
              <i className="fa-solid fa-comment"></i> Avis
            </li>
          </ul>
        </nav>

        {/* Actions à droite */}
        <div className="header-actions">
          <div className="cart-icon" onClick={() => redirect("/panier")}>
            <i className="fa-solid fa-cart-shopping"></i>
            {panier.length > 0 && (
              <span className="cart-badge">{panier.length}</span>
            )}
          </div>

          {/* {estConnecter && (
            <div className="user-avatar" title={user.prenom}>
              {(user.nom[0] + user.prenom[0]).toUpperCase()}
            </div>
          )}
          {!estConnecter && (
            <div className="user-avatar" title={"utilisateur"}>
              CL
            </div>
          )} */}

          {/* Connexion / Déconnexion dans le menu mobile */}
          <button className="mobile-login">
            {estConnecter ? (
              <>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span onClick={() => redirect("/logout")}>Déconnexion</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket"></i>
                <span onClick={() => redirect("/login")}>Connexion</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
