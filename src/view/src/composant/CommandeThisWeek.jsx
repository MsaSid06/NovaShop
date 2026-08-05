// import { Bar } from "react-chartjs-2";

// function CommandeThisWeek({ commandes }) {
//   const weekDays = [1, 2, 3, 4, 5, 6, 0]; // Lundi à Dimanche
//   const commandesThisWeek = commandes.filter((commande) => {
//     const dateCommande = new Date(commande.date_commande);
//     const now = new Date();
//     const oneWeekAgo = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() - 7,
//     );
//     return dateCommande >= oneWeekAgo && dateCommande <= now;
//   });

//   const totalCommandes = commandesThisWeek.length;

//   const data = {
//     labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
//     datasets: [
//       {
//         label: "Commandes de la semaine",
//         data: [totalCommandes, commandes.length - totalCommandes],
//         backgroundColor: ["#3b82f6", "#94a3b8"],
//       },
//     ],
//   };
// //
//   return (
//     <div>
//       <h3>Commandes de la semaine</h3>
//       <Bar data={data} />
//     </div>
//   );
// }

// export default CommandeThisWeek;
