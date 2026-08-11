import Nav from "../includes/Nav.jsx";
import { useContext, useEffect, useState } from "react";
import "./proprio.css";
import ListeCommande from "../composant/ListeCommande";
import CommandeThisWeek from "../composant/CommandeThisWeek.jsx";
import UserTable from "../composant/UserTable.jsx";
import AvisTable from "../composant/AvisTable.jsx";
import ProductTable from "../composant/ProductTable.jsx";
import CategorieTable from "../composant/CategorieTable.jsx";
import Stat from "../composant/Stat.jsx";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth.jsx";

function Dashoard_proprietaire() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [setPage, setSetPage] = useState("Statistiques");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const now = new Date();
  // console.log(user);
  useEffect(() => {
    if (!user || user.role != "proprietaire") {
      navigate("/");
      // return;
    }
  }, [navigate, user]);
  return (
    <div className="dashboard">
      <Nav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSetPage={setSetPage}
        setPage={setPage}
      />

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="dashboard-main">
        {setPage == "Commandes" ? <ListeCommande /> : ""}
        {setPage == "Produits" ? <ProductTable /> : ""}
        {setPage == "Categories" ? <CategorieTable /> : ""}
        {setPage == "Clients" ? <UserTable /> : ""}
        {setPage == "Commentaires" ? <AvisTable /> : ""}
        {setPage == "CommandeThisWeek" ? <CommandeThisWeek /> : ""}
        {setPage == "Statistiques" ? <Stat /> : ""}
      </main>
    </div>
  );
}

export default Dashoard_proprietaire;
