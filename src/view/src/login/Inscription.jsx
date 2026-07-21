import { useNavigate } from "react-router-dom";
import "./Inscription.css";
function Inscription() {
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = {
      nom: fd.get("nom"),
      prenom: fd.get("prenom"),
      telephone: fd.get("telephone"),
      email: fd.get("email"),
      mot_de_passe: fd.get("mot_de_passe"),
      role: "client",
    };
    console.log(JSON.stringify(data));
    const response = await fetch(
      "http://localhost/Boutique/src/controllers/api_users.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (result.message === 200) {
      alert("Inscription réussie ! veuillez vous connecter.");
      navigate("/login");
    } else {
      alert(result.message);
    }
  }
  return (
    <>
      <main className="body-Inscription">
        <div className="register-container">
          <p>Créez votre compte</p>
          <h6 className="champn-requis">Tout les champs (*) sont requis</h6>
          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="nom" required>
              Nom: <span className="required">*</span>
            </label>
            <input type="text" id="nom" name="nom" required />
            <br />
            <label htmlFor="prenom" required>
              Prenom: <span className="required">*</span>
            </label>
            <input type="text" id="prenom" name="prenom" required />
            <br />
            <label htmlFor="tel" required>
              Téléphone: <span className="required">*</span>
            </label>
            <input type="tel" id="tel" name="telephone" required />
            <br />
            <label htmlFor="email" required>
              Email: <span className="required">*</span>
            </label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="mdp" required>
              Mot de passe: <span className="required">*</span>
            </label>
            <input type="password" id="mdp" name="mot_de_passe" required />
            <br />
            <button type="submit">S'inscrire</button>
          </form>
          {/* <p className="erreur"></p> */}
        </div>
      </main>
    </>
  );
}

export default Inscription;
