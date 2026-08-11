// import ListeCommande from "../composant/ListeCommande";
import Nav from "../includes/Nav.jsx";
import { useState } from "react";
import "./proprio.css";
// import CommandeThisWeek from "../composant/CommandeThisWeek.jsx";
// import UserTable from "../composant/UserTable.jsx";
// import AvisTable from "../composant/AvisTable.jsx";
// import ProductTable from "../composant/ProductTable.jsx";
// import CategorieTable from "../composant/CategorieTable.jsx";
// import StatsByCategories from "../composant/StatsByCategories.jsx";
import Stat from "../composant/Stat.jsx";
function Dashoard_proprietaire() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // const now = new Date();
  // console.log(now.getDay(), now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <div className="dashboard">
      <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="dashboard-main">
        {/* <ListeCommande /> */}
        {/* <ProductTable />  */}
        {/* <CategorieTable /> */}
        {/* <UserTable />
         */}
        {/* <AvisTable /> */}
        {/* <CommandeThisWeek /> */}
        {/* <StatsByCategories />
         */}
        <Stat />
      </main>
    </div>
  );
}

export default Dashoard_proprietaire;
