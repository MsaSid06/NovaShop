import { useContext } from "react";
import { CommandeContext } from "../context/CommandeContext";
import { UserContext } from "../context/UserContext";
import { LigneCommandeContext } from "../context/LigneCommandeContext";
import Revenu from "./Revenu.jsx";
import StatsByCategories from "./StatsByCategories.jsx";
import CommandeThisWeek from "./CommandeThisWeek.jsx";
import "./CSS/Stat.css";

export default function Stat() {
  const { commandes } = useContext(CommandeContext);
  const { lignecommandes } = useContext(LigneCommandeContext);
  const { users } = useContext(UserContext);

  const commandePasser = commandes.filter((c) => c.statut === "Livrer").length;
  const commandeLivrer = lignecommandes.filter((l) => l.statut === "Livrer");

  const total = commandeLivrer.reduce(
    (totale, ligne) => totale + ligne.quantite * Number(ligne.prix),
    0,
  );

  return (
    <div className="stats-page">
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fa-solid fa-box"></i>
          <span className="stat-title">Commandes livrées</span>
          <h2>{commandePasser}</h2>
        </div>

        <div className="stat-card">
          <i className="fa-solid fa-dollar-sign"></i>
          <span className="stat-title">Chiffre d’affaires</span>
          <h2>{total.toLocaleString("fr-FR")} FCFA</h2>
        </div>

        <div className="stat-card">
          <i className="fa-solid fa-users"></i>
          <span className="stat-title">Clients</span>
          <h2>{users?.length - 1}</h2>
        </div>

        <div className="stat-card">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="stat-title">Produits vendus</span>
          <h2>{commandeLivrer.reduce((a, b) => a + b.quantite, 0)}</h2>
        </div>
      </div>

      <div className="chart-card">
        <div className="card-header">
          <h3>Évolution du chiffre d’affaires</h3>
          <p>Année en cours</p>
        </div>
        <Revenu />
      </div>

      <div className="bottom-grid">
        <div className="bottom-card">
          <CommandeThisWeek />
        </div>

        <div className="bottom-card">
          <StatsByCategories />
        </div>
      </div>
    </div>
  );
}
