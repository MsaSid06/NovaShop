import "./CSS/ProductTable.css";
import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/Auth.jsx";
import LocalContext from "../context/Localhost";
// import CreateProduct from "./CreateProduct.jsx";
import { UserContext } from "../context/UserContext.jsx";
import DetailUser from "./DetailUser.jsx";
// -- -- Table : Utilisateur
// -- CREATE TABLE Utilisateur (
// --     id_utilisateur   INT AUTO_INCREMENT,
// --     nom              VARCHAR(100)        NOT NULL,
// --     prenom           VARCHAR(100)        NOT NULL,
// --     email            VARCHAR(150)        NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
// --     mot_de_passe     VARCHAR(255)        NOT NULL,
// --     role             ENUM('proprietaire', 'client', 'admin') NOT NULL DEFAULT 'client',
// --     telephone        VARCHAR(20)         NOT NULL,
// --     date_creation    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,

// --     CONSTRAINT pk_utilisateur PRIMARY KEY (id_utilisateur)

// -- ) ENGINE=InnoDB;

function UserTable() {
  // const chemin = "/assets/Produits/";

  // const { user } = useContext(AuthContext); ggerer les droits d'acces pour les utilisateurs
  const { localhost } = useContext(LocalContext);
  const { users } = useContext(UserContext);
  const [userAffiche, setUserAffiche] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [userShow, setUserShow] = useState(null);

  useEffect(() => {
    async function a() {
      setUserAffiche(users);
    }
    a();
  }, [users]);

  function searchUser(event) {
    const value = event.target.value.toLowerCase();

    let filteredUsers = users;

    filteredUsers = filteredUsers.filter((user) =>
      user.nom.toLowerCase().includes(value),
    );

    setUserAffiche(filteredUsers);
  }
  // console.log(users);
  async function deleteUser(id, nom, prenom) {
    if (confirm(`Voulez-vous supprimer : ${prenom} ${nom}?`)) {
      const data = {
        id: id,
      };

      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_users.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      alert(
        result.message
          ? "Utilisateur supprimé avec succès"
          : "Veuillez réessayer",
      );
    }
  }
  // console.log(window.location.pathname);
  function showUser(u) {
    // setUserUpdate(u);
    // console.log(u);
    setShowDetails(true);
    setUserShow(u);
  }
  // // console.log(products);

  return (
    <>
      <section className="produit-search">
        <div className="produit-wrapper">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            onChange={searchUser}
          />
        </div>
      </section>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Contacts</th>
              <th>Comandes </th>
              <th>Total dépense</th>
              {/* <th>Score</th> */}
              <th>Date Inscription</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userAffiche.map((u) => (
              <tr key={u.id_utilisateur}>
                <td>
                  <div className="product-info">
                    <span
                      className={`avatar-table ${Number(u.nombre_commandes) > 0 ? "active" : "inactive"}`}
                    >
                      {(u.nom[0] + u.prenom[0]).toUpperCase()}
                    </span>
                    <div>
                      <p className="product-name">
                        {(u.nom + " " + u.prenom).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="category-badge">{u.email}</span>
                  <br />
                  <span className="category-badge">{u.telephone}</span>
                </td>

                <td className="price">{u.nombre_commandes}</td>

                <td>{u.total_depense}</td>

                <td>
                  <span className="status active">{u.date_creation}</span>
                </td>

                <td>
                  <div className="actions">
                    <button onClick={() => showUser(u)}>
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        deleteUser(u.id_utilisateur, u.nom, u.prenom)
                      }
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDetails && (
          <DetailUser
            user={userShow}
            onClose={() => {
              setShowDetails(false);
              setUserShow(null);
            }}
          />
        )}
      </div>
    </>
  );
}

export default UserTable;
