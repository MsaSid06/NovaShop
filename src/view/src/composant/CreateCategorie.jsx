import { useContext, useState, useEffect } from "react";
import "./CSS/CreateProduct.css";
import LocalContext from "../context/Localhost";

function CreateCategorie({ categorie, onClose, action }) {
  // const { categories } = useContext(CategorieContext);
  const { localhost } = useContext(LocalContext);
  const [categorieState, setCategorie] = useState({
    id_categorie: "",
    nom_categorie: "",
    description: "",
    date_creation: "",
    chemin_fichier: "",
    image: null,
  });

  useEffect(() => {
    async function a() {
      if (action && categorie) {
        setCategorie({
          chemin_fichier: categorie.chemin_fichier ?? "",
          id_categorie: categorie.id_categorie ?? "",
          nom_categorie: categorie.nom_categorie ?? "",
          description: categorie.description ?? "",
          date_creation: categorie.date_creation ?? "",
          image: null,
        });
      } else {
        setCategorie({
          chemin_fichier: "",
          id_categorie: "",
          nom_categorie: "",
          description: "",
          date_creation: "",
          image: null,
        });
      }
    }
    a();
  }, [action, categorie]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategorie({
      ...categorieState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!action) {
      const formData = new FormData();

      formData.append("chemin_fichier", categorieState.chemin_fichier);
      formData.append("nom_categorie", categorieState.nom_categorie);
      formData.append("description", categorieState.description);
      if (categorieState.image) {
        formData.append("image", categorieState.image);
      }
      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_categories.php`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const result = await response.json();
      alert(
        result.message
          ? "La catégorie a été ajoutée avec succès"
          : "Veuillez recommencer, une erreur s'est produite",
      );
      if (result.message) onClose(); // fermeture après enregistrement
    } else {
      const data = {
        id_categorie: categorieState.id_categorie,
        nom_categorie: categorieState.nom_categorie,
        description: categorieState.description,
        // date_creation: categorieState.date_creation,
        chemin_fichier: categorieState.chemin_fichier,
      };

      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_categories.php`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();

      alert(
        result.message
          ? "La catégorie a été modifiée avec succès"
          : "Veuillez recommencer, une erreur s'est produite",
      );
      if (result.message) onClose(); // fermeture après enregistrement
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop();
    const nomFichier = `${categorieState.nom_categorie
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase()}_${Date.now()}.${extension}`;

    setCategorie((prev) => ({
      ...prev,
      image: file,
      chemin_fichier: nomFichier,
    }));
  };
  // console.log(categorie);
  return (
    <div className="product-overlay">
      <div className="product-modal">
        <div className="modal-header">
          {action && <h2>Modifier la catégorie</h2>}
          {!action && <h2>Créer une catégorie</h2>}

          <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="form-group">
          {!action && <label>Ajouter une image</label>}
          {action && <label>Modifier l'image</label>}

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            required={!action}
            disabled={action}
          />

          {categorieState.chemin_fichier && (
            <>
              <p className="image-name">
                Image : {categorieState.chemin_fichier}
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom catégorie</label>

            <input
              type="text"
              name="nom_categorie"
              placeholder="ex. chemise "
              value={categorieState.nom_categorie ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="ex. chemise en lain..."
              value={categorieState.description ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Annuler
            </button>

            {!action && (
              <button type="submit" className="save">
                Enregistrer
              </button>
            )}
            {action && (
              <button type="submit" className="save">
                Modifier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategorie;
