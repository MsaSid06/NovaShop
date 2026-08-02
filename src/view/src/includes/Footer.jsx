import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  function redirect(lien) {
    navigate(lien);
  }
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>
            <i className="fa-solid fa-shop"></i>NovaShop
          </h2>
          <p>
            Découvrez des produits de qualité au meilleur prix. Votre
            satisfaction est notre priorité.
          </p>
        </div>

        {/* Liens */}
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li>
              <a onClick={() => redirect("/client")}>Accueil</a>
            </li>
            <li>
              <a onClick={() => redirect("/produit")}>Produits</a>
            </li>
            <li>
              <a onClick={() => redirect("/#categories")}>Catégories</a>
            </li>
            <li>
              <a onClick={() => redirect("/#footer")}>Contact</a>
            </li>
          </ul>
        </div>

        {/* Service Client */}
        {/* <div className="footer-section">
          <h3>Service Client</h3>
          <ul>
            <li>Livraison</li>
            <li>Retours</li>
            <li>FAQ</li>
            <li>Politique de confidentialité</li>
          </ul>
        </div> */}

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <i className="fa-solid fa-location-dot"></i> Dakar, Sénégal
          </p>

          <p>
            <i className="fa-solid fa-phone"></i> +221 78 582 36 83
          </p>

          <p>
            <i className="fa-solid fa-envelope"></i> moussasidime10@gmail.com
          </p>

          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/msa_sid_18?igsh=MTEzcTZkYWpoMGgzdg==">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.tiktok.com/@msa_code?_r=1&_t=ZS-98C5Zzp17PY">
              <i className="fa-brands fa-tiktok"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ma Boutique - Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
