import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  async function handleLogout() {
    const response = await fetch(
      "http://localhost/Boutique/src/controllers/user_logout.php",
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
