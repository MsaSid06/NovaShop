import ListeCommande from "../composant/ListeCommande";
import Nav from "../includes/Nav.jsx";
import { useState } from "react";
import "./proprio.css";
import ProductTable from "../composant/ProductTable.jsx";
function Dashoard_proprietaire() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard">
      <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="dashboard-main">
        <ListeCommande />
        <ProductTable />
      </main>
    </div>
  );
}

export default Dashoard_proprietaire;
