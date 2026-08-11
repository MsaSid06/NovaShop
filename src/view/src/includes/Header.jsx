import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PanierContext } from "../context/PanierContext";
import AuthContext from "../context/Auth";
import LocalContext from "../context/Localhost";

function Header() {
  const { panier } = useContext(PanierContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathnameInterdites = ["/proprio", "/login", "/inscription", "/logout"];
  const { user } = useContext(AuthContext);
  const { localhost } = useContext(LocalContext);

  useEffect(() => {
    async function modifProfile() {}
    modifProfile();
  }, [user, localhost]);

  function redirect(lien) {
    if (lien == "/logout") {
      alert("Vous etes deconnectez");
      // user = [];
    }
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
  // utilisateur = user;
  if (pathnameInterdites.includes(window.location.pathname)) {
    return null;
  }
  return (
    <header className="header" id="header">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="header-container">
        <div className="header-logo" onClick={() => redirect("/")}>
          <i className="fa-solid fa-shop"></i>
          <span>NovaShop</span>
        </div>

        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <i
            className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
          ></i>
        </button>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => allerVers("header")}>
              <i className="fa-solid fa-house"></i> Accueil
            </li>

            <li onClick={() => redirect("/produit")}>
              <i className="fa-solid fa-bag-shopping"></i> Produit
            </li>

            <li onClick={() => redirect("/Apropos")}>
              <i className="fa-solid fa-envelope"></i> A Propos
            </li>

            <li onClick={() => allerVers("avis")}>
              <i className="fa-solid fa-comment"></i> Avis
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="cart-icon" onClick={() => redirect("/panier")}>
            <i className="fa-solid fa-cart-shopping"></i>
            {panier.length > 0 && (
              <span className="cart-badge">{panier.length}</span>
            )}
          </div>

          <button className="mobile-login">
            {user?.role ? (
              <>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span onClick={() => redirect("/")}>Déconnexion</span>
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
