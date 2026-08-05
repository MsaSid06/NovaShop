import "./DetailUser.css";

function DetailUser({ user, onClose }) {
  const active = Number(user.nombre_commandes) > 0 ? "Active" : "Inactive";
  const initials = `${user.prenom?.charAt(0) || ""}${user.nom?.charAt(0) || ""}`;

  return (
    <div className="detail-overlay">
      <div className="detail-card">
        <div className="detail-header">
          <h2>Profile Client</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="detail-profile">
          <div
            className={`avatar ${active === "Active" ? "active" : "inactive"}`}
          >
            {initials.toUpperCase()}
          </div>

          <div className="profile-info">
            <h3>
              {user.prenom} {user.nom}
            </h3>
            <span
              className={`status-badge ${active === "Active" ? "active" : "inactive"}`}
            >
              {active}
            </span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <span>Total Orders</span>
            <h3>{user.nombre_commandes || 0}</h3>
          </div>

          <div className="stat-box highlight">
            <span>Total Spent</span>
            <h3>{Number(user.total_depense || 0).toLocaleString()} FCFA</h3>
          </div>
        </div>

        <div className="info-list">
          <div className="info-item">
            <i className="fa-regular fa-envelope"></i>
            <span>{user.email}</span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-phone"></i>
            <span>{user.telephone}</span>
          </div>

          <div className="info-item">
            <i className="fa-regular fa-calendar"></i>
            <span>
              {new Date(user.date_creation).toLocaleDateString("fr-FR")}
            </span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-user-tag"></i>
            <span>{user.role}</span>
          </div>
        </div>

        <div className="detail-footer">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
