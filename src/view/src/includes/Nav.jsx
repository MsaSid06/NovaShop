import "./Nav.css";
// import Logout from "../login/Logout";?
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

function Nav({ sidebarOpen, setSidebarOpen, setSetPage, setPage }) {
  const navigate = useNavigate();
  const menus = [
    {
      icon: <i className="fa-solid fa-chart-column"></i>,
      title: "Statistiques",
      active: true,
    },
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      title: "Commandes",
    },
    {
      icon: <i className="fa-solid fa-box-open"></i>,
      title: "Produits",
    },
    {
      icon: <i className="fa-solid fa-tags"></i>,
      title: "Categories",
    },
    {
      icon: <i className="fa-solid fa-users"></i>,
      title: "Clients",
    },
    {
      icon: <i className="fa-regular fa-star"></i>,
      title: "Commentaires",
    },
  ];
  function afficher(nom) {
    setSetPage(nom);
  }
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar close"}>
      <div className="nova">
        <div className="nova-icon">
          <i className="fa-solid fa-shop"></i>
        </div>

        <div className="nova-text">
          <h2>NovaShop</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <ul className="menu">
        {menus.map((item, index) => (
          <li
            key={index}
            className={setPage == item.title ? "active" : ""}
            onClick={() => afficher(item.title)}
          >
            <div className="left">
              <span className="icon">{item.icon}</span>

              <span>{item.title}</span>
            </div>

            {item.badge && <span className="badge">{item.badge}</span>}
          </li>
        ))}
      </ul>

      <div className="logout">
        <button onClick={() => navigate("/logout")}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>

      <div className="collapse">
        <i className="fa-solid fa-angles-left"></i>
        Collapse
      </div>
      <button
        className="toggle-sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
    </aside>
  );
}

export default Nav;
