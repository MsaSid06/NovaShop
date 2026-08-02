import { useState } from "react";
import "./Apropos.css";
import { useNavigate } from "react-router-dom";

const NUMERO_WHATSAPP = "221785823683";

export default function Apropos() {
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    // email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  const redirect = () => {
    navigate("/produit");
  };
  function handleSubmit(e) {
    e.preventDefault();

    const texte =
      `Bonjour NovaShop,\n\n` +
      `Nom : ${form.nom}\n` +
      `Prénom : ${form.prenom}\n` +
      //   `Email : ${form.email}\n\n` +
      `Message :\n${form.message}`;

    const lienWhatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texte)}`;

    window.open(lienWhatsapp, "_blank");

    setForm({ nom: "", prenom: "", email: "", message: "" });
    setShowContact(false);
  }

  return (
    <main className="about">
      {/* ================= HERO ================= */}
      <section className="about-hero">
        <video className="about-video" autoPlay muted loop playsInline>
          <source src="/videos/NovaShop.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos.
        </video>

        <div className="about-overlay"></div>

        <div className="about-hero-content">
          <span className="about-badge">Bienvenue chez NovaShop</span>

          <h1>
            La mode qui révèle
            <br />
            votre personnalité.
          </h1>

          <p>
            NovaShop est une boutique de prêt-à-porter dédiée aux hommes, femmes
            et enfants. Découvrez des vêtements modernes, des accessoires
            élégants et des produits de beauté soigneusement sélectionnés pour
            sublimer votre quotidien.
          </p>

          <div className="about-buttons">
            <button onClick={redirect}>Découvrir la collection</button>
            <button className="outline" onClick={() => setShowContact(true)}>
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTACT (modale) ================= */}
      {showContact && (
        <div className="contact-overlay" onClick={() => setShowContact(false)}>
          <section
            className="about-contact"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowContact(false)}>
              <i className="fa-regular fa-circle-xmark"></i>
            </button>

            <div className="section-title">
              <span>Contact</span>
              <h2>Nous sommes à votre écoute</h2>

              <p>
                Une question, une suggestion ou besoin d'informations ?
                N'hésitez pas à nous envoyer un message.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-box">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-box">
                  <label>Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Votre prénom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* <div className="input-box">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="exemple@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div> */}

              <div className="input-box">
                <label>Message</label>
                <textarea
                  rows="7"
                  name="message"
                  placeholder="Écrivez votre message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-btn">
                <i className="fa-solid fa-paper-plane"></i>
                Envoyer le message
              </button>
            </form>
          </section>
        </div>
      )}

      {/* ================= HISTOIRE ================= */}
      <section className="about-story container">
        <div className="story-image">
          <img src="/NovaShop.png" alt="NovaShop" />
        </div>

        <div className="story-content">
          <span>Notre histoire</span>

          <h2>Une boutique pensée pour toute la famille.</h2>

          <p>
            NovaShop est née de la volonté de rendre la mode élégante accessible
            à tous. Nous sélectionnons avec soin chaque article afin de proposer
            des collections qui allient qualité, confort et style.
          </p>

          <p>
            Que vous recherchiez une tenue pour une occasion spéciale ou un look
            du quotidien, notre boutique vous accompagne avec des vêtements
            tendance et des accessoires qui font la différence.
          </p>
        </div>
      </section>

      {/* ================= COLLECTIONS ================= */}
      <section className="about-collections">
        <div className="section-title">
          <span>Nos univers</span>
          <h2>Des collections pour chaque style</h2>
        </div>

        <div className="collection-grid">
          <div className="collection-card">
            <i className="fa-solid fa-user-tie"></i>
            <h3>Homme</h3>
            <p>
              Costumes, chemises, polos, chaussures et tenues décontractées.
            </p>
          </div>

          <div className="collection-card">
            <i className="fa-solid fa-person-dress"></i>
            <h3>Femme</h3>
            <p>Robes, ensembles, sacs, chaussures et collections élégantes.</p>
          </div>

          <div className="collection-card">
            <i className="fa-solid fa-child"></i>
            <h3>Enfant</h3>
            <p>Des vêtements confortables et modernes pour les plus jeunes.</p>
          </div>

          <div className="collection-card">
            <i className="fa-solid fa-gem"></i>
            <h3>Accessoires</h3>
            <p>Bracelets, montres, bijoux, sacs et bien plus encore.</p>
          </div>

          <div className="collection-card">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <h3>Beauté</h3>
            <p>Produits de beauté et parfums sélectionnés avec soin.</p>
          </div>
        </div>
      </section>

      {/* ================= POURQUOI NOUS ================= */}
      <section className="about-features container">
        <div className="section-title">
          <span>Pourquoi NovaShop ?</span>
          <h2>Une expérience pensée pour vous.</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-solid fa-star"></i>
            <h3>Qualité Premium</h3>
            <p>
              Des produits sélectionnés selon des critères de qualité exigeants.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-truck-fast"></i>
            <h3>Livraison Rapide</h3>
            <p>
              Vos commandes sont préparées avec soin et expédiées rapidement.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-lock"></i>
            <h3>Paiement Sécurisé</h3>
            <p>Achetez en toute sérénité grâce à des paiements protégés.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-headset"></i>
            <h3>Support Client</h3>
            <p>Une équipe disponible pour répondre à toutes vos questions.</p>
          </div>
        </div>
      </section>

      {/* ================= VALEURS ================= */}
      <section className="about-values">
        <div className="section-title">
          <span>Nos valeurs</span>
          <h2>Ce qui nous guide chaque jour.</h2>
        </div>

        <div className="values">
          <div>
            <i className="fa-solid fa-heart"></i>
            <h4>Passion</h4>
          </div>

          <div>
            <i className="fa-solid fa-award"></i>
            <h4>Qualité</h4>
          </div>

          <div>
            <i className="fa-solid fa-handshake"></i>
            <h4>Confiance</h4>
          </div>

          <div>
            <i className="fa-solid fa-lightbulb"></i>
            <h4>Innovation</h4>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="about-stats">
        <div className="stat">
          <h2>1000+</h2>
          <span>Clients satisfaits</span>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <span>Articles disponibles</span>
        </div>

        <div className="stat">
          <h2>100%</h2>
          <span>Paiement sécurisé</span>
        </div>

        <div className="stat">
          <h2>7j/7</h2>
          <span>Support client</span>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Prêt à renouveler votre style ?</h2>

          <p>
            Découvrez les dernières tendances et trouvez les pièces qui
            correspondent parfaitement à votre personnalité.
          </p>

          <button onClick={redirect}>Explorer la boutique</button>
        </div>
      </section>
    </main>
  );
}
