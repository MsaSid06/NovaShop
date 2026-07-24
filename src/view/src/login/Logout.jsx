import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LocalContext from "../context/Localhost";
function Logout() {
  const navigate = useNavigate();
  const { localhost } = useContext(LocalContext);
  async function handleLogout() {
    const response = await fetch(
      `http://${localhost}/Boutique/src/controllers/user_logout.php`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = await response.json();
    if (result.message === 200) {
      alert(result.message);
      redirectLogin();
    } else {
      alert(result.message);
    }
  }
  function redirectLogin() {
    navigate("/login");
  }
  return (
    <div>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default Logout;
