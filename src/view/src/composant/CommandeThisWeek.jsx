import { Bar } from "react-chartjs-2";
import { CommandeContext } from "../context/CommandeContext.jsx";
import { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CommandeThisWeek() {
  const { commandes } = useContext(CommandeContext);
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function getCurrentWeek() {
    const today = new Date();
    const day = today.getDay();

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return {
      monday: formatDate(monday),
      sunday: formatDate(sunday),
    };
  }
  // const date = new Date();
  // console.log("date ", date.getDate("2026-01-15 10:00:00"));
  const { monday, sunday } = getCurrentWeek();

  // console.log(new Date(commandes[0].date_commande)); // "2026-08-10 00:00:00"
  // console.log(sunday); // "2026-08-16 23:59:59"
  // const { monday, sunday } = getCurrentWeek();
  // ("2026-01-15 10:00:00");

  // Mon Aug 10 2026 00:00:00 GMT+0000 (temps universel coordonné) getYear(), getMonth(), getDate()
  // Sun Aug 16 2026 23:59:59 GMT+0000 (temps universel coordonné)
  const ThisWeek = commandes.filter((commande) => {
    const date_commande = formatDate(new Date(commande.date_commande));
    return date_commande >= monday && date_commande <= sunday;
  });

  // console.log("Commandes de la semaine :", monday, sunday);
  // console.log(
  //   "Commandes de la semaine :",
  //   new Date(ThisWeek[0]?.date_commande).getDay(),
  // );
  // console.log("Commandes de la semaine :", commandes);
  const commandesByDay = [0, 0, 0, 0, 0, 0, 0];

  ThisWeek.forEach((commande) => {
    const day = new Date(commande.date_commande).getDay();
    commandesByDay[day === 0 ? 6 : day - 1] += 1;
  });

  const data = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: commandesByDay.reduce((a, b) => a + b, 0) + " Commandes",
        data: commandesByDay,
        backgroundColor: commandesByDay.map((count) => {
          if (count < 1) return "#e04747";
          return "#1e8f1c";
        }),
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // const option = {
  //   indexAxis: "y",
  // };

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>
        Commandes de la semaine du {monday} au {sunday}
      </h3>
      <div style={{ height: "300px", width: "100%" }}>
        <Bar data={data} options={options} />
        {/* <Bar data={data} options={option} /> */}
      </div>
    </div>
  );
}

export default CommandeThisWeek;
