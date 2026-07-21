// import { useState } from "react";
// import { strictMode } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login.jsx";
import Logout from "./login/Logout.jsx";
import Inscription from "./login/Inscription.jsx";
import Dashboard_client from "./view/Dashboard_client.jsx";
import Produit from "./composant/Produits.jsx";
import Footer from "./includes/Footer.jsx";
import Header from "./includes/Header.jsx";
import Avis from "./composant/Avis.jsx";
import Panier from "./composant/Panier.jsx";
import "./App.css";

// import Dashboard_proprietaire from "./view/Dashboard_proprietaire.jsx";
// import { AuthProvider } from "./context/Auth.jsx";
// import { AuthContext } from "./context/AuthContext.jsx";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext.jsx";
// import { AuthProvider } from "./context/Auth.jsx";

function App() {
  return (
    <>
      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard_client />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/Avis" element={<Avis />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/client" element={<Dashboard_client />} />
            <Route path="/produit" element={<Produit />} />
            {/* <Route path="/proprietaire" element={<Dashboard_proprietaire />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
