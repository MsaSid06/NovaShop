import { Line } from "react-chartjs-2";
import { CommandeContext } from "../context/CommandeContext";
import { LigneCommandeContext } from "../context/LigneCommandeContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function Revenu() {
  const { commandes } = useContext(CommandeContext);
  const { lignecommandes } = useContext(LigneCommandeContext);
  // let CAcommandesParMois = Array(12).fill(0);
  const date = new Date();
  const YearNow = date.getFullYear();

  let commandesParMois = Array(12).fill(0);

  const CommandeCurrentYears = commandes.filter((c) => {
    return (
      new Date(c.date_commande).getFullYear() == YearNow && c.statut == "Livrer"
    );
  });

  const CAcommandesParMois = Array(12).fill(0);

  lignecommandes
    .filter((l) => {
      const date = new Date(l.date_commande);
      return date.getFullYear() === YearNow && l.statut === "Livrer";
    })
    .forEach((l) => {
      const mois = new Date(l.date_commande).getMonth();
      CAcommandesParMois[mois] += Number(l.prix) * Number(l.quantite);
    });

  CommandeCurrentYears.forEach((commande) => {
    const mois = new Date(commande.date_commande).getMonth();
    commandesParMois[mois]++;
  });

  console.log(CAcommandesParMois);

  // console.log(commandes, CommandeCurrentYears);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aout",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: CAcommandesParMois,
        borderColor: "#2563eb",
        tension: 0.4,
        fill: true,
        yAxisID: "revenue",
      },
      {
        label: "Commandes",
        data: commandesParMois,
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "Commandes",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      revenue: {
        type: "linear",
        position: "left",
        grid: {
          color: "#e5e7eb",
        },
      },
      Commandes: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div style={{ height: "380px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}
