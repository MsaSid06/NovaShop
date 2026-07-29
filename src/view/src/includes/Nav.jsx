import "./Nav.css";
// import { useState } from "react";

function Nav({ sidebarOpen, setSidebarOpen }) {
  //   const [sidebarOpen, setSidebarOpen] = useState(true);
  const menus = [
    {
      icon: <i className="fa-solid fa-table-columns"></i>,
      title: "Dashboard",
    },
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      title: "Orders",
    },
    {
      icon: <i className="fa-solid fa-box-open"></i>,
      title: "Products",
    },
    {
      icon: <i className="fa-solid fa-tags"></i>,
      title: "Categories",
    },
    {
      icon: <i className="fa-solid fa-users"></i>,
      title: "Customers",
    },
    {
      icon: <i className="fa-regular fa-star"></i>,
      title: "Reviews",
    },
    {
      icon: <i className="fa-solid fa-circle-info"></i>,
      title: "About Page",
    },
    {
      icon: <i className="fa-regular fa-bell"></i>,
      title: "Notifications",
      badge: 3,
    },
    {
      icon: <i className="fa-solid fa-chart-column"></i>,
      title: "Statistics",
      active: true,
    },
    {
      icon: <i className="fa-solid fa-gear"></i>,
      title: "Settings",
    },
  ];

  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar close"}>
      <div className="logo">
        <div className="logo-icon">
          <i className="fa-solid fa-shop"></i>
        </div>

        <div className="logo-text">
          <h2>NovaShop</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <ul className="menu">
        {menus.map((item, index) => (
          <li
            key={index}
            className={item.active ? "active" : ""}
            onClick={() => console.log(item.title)}
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
        <button>
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

// import "./Sidebar.css";

// function Nav() {
//   const menus = [
//     {
//       icon: <i className="fa-solid fa-table-columns"></i>,
//       title: "Dashboard",
//     },
//     {
//       icon: <i className="fa-solid fa-cart-shopping"></i>,
//       title: "Orders",
//     },
//     {
//       icon: <i className="fa-solid fa-box-open"></i>,
//       title: "Products",
//     },
//     {
//       icon: <i className="fa-solid fa-tags"></i>,
//       title: "Categories",
//     },
//     {
//       icon: <i className="fa-solid fa-users"></i>,
//       title: "Customers",
//     },
//     {
//       icon: <i className="fa-regular fa-star"></i>,
//       title: "Reviews",
//     },
//     {
//       icon: <i className="fa-solid fa-circle-info"></i>,
//       title: "About Page",
//     },
//     {
//       icon: <i className="fa-regular fa-bell"></i>,
//       title: "Notifications",
//       badge: 3,
//     },
//     {
//       icon: <i className="fa-solid fa-chart-column"></i>,
//       title: "Statistics",
//       active: true,
//     },
//     {
//       icon: <i className="fa-solid fa-gear"></i>,
//       title: "Settings",
//     },
//   ];

//   return (
//     <aside className="sidebar">
//       <div className="logo">
//         <div className="logo-icon">
//           <i className="fa-solid fa-bolt"></i>
//         </div>

//         <div>
//           <h2>NovaShop</h2>
//           <span>Admin Panel</span>
//         </div>
//       </div>

//       <ul className="menu">
//         {menus.map((item, index) => (
//           <li
//             key={index}
//             className={item.active ? "active" : ""}
//             onClick={() => console.log(item.title)}
//           >
//             <div className="left">
//               <span className="icon">{item.icon}</span>
//               <span>{item.title}</span>
//             </div>

//             {item.badge && <span className="badge">{item.badge}</span>}
//           </li>
//         ))}
//       </ul>

//       <div className="logout">
//         <button>
//           <i className="fa-solid fa-right-from-bracket"></i>
//           Logout
//         </button>
//       </div>

//       <div className="collapse">
//         <i className="fa-solid fa-angles-left"></i>
//         Collapse
//       </div>
//     </aside>
//   );
// }

// export default Nav;
