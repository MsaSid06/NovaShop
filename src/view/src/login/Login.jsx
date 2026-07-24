import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth.jsx";
import LocalContext from "../context/Localhost.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { localhost } = useContext(LocalContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = {
      email: fd.get("email"),
      mot_de_passe: fd.get("mot_de_passe"),
    };
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/user_login.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    // const result = await response.text();
    // console.log(result);
    if (result.user) {
      alert(result.message);
      // Mettre à jour le contexte d'authentification
      setUser(result.user);
      switch (result.user.role) {
        case "admin":
          redirectDashboard("/admin");
          break;
        case "client":
          redirectDashboard("/client");
          break;
        case "proprietaire":
          redirectDashboard("/proprietaire");
          break;
        default:
          redirectDashboard("/login");
          break;
      }
    } else {
      alert(result.message);
    }
  }
  function redirectDashboard(lien) {
    navigate(lien);
  }
  return (
    <>
      <section className="login">
        <div className="login-container">
          <p>Connectez-vous à votre compte</p>
          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="email" required>
              Email:
            </label>
            <input type="text" id="email" name="email" required />
            <br />
            <label htmlFor="mot_de_passe" required>
              Mot de passe:
              <span className="forgot-password">Mot de passe oublié</span>
            </label>
            <input type="password" id="mdp" name="mot_de_passe" required />
            <br />
            <button type="submit">Se connecter</button>
          </form>
          <p>
            Nouveau client?{" "}
            <button onClick={() => navigate("/inscription")}>
              Créez un compte
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
export default Login;
