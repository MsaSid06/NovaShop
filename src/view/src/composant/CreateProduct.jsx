import { useContext, useState, useEffect } from "react";
import "./CSS/CreateProduct.css";
import { CategorieContext } from "../context/categorieContext";
import LocalContext from "../context/Localhost";

function CreateProduct({ product, onClose, action }) {
  const { categories } = useContext(CategorieContext);
  const { localhost } = useContext(LocalContext);
  const [produit, setProduit] = useState({
    id_produit: "",
    id_categorie: "",
    nom_produit: "",
    description: "",
    prix: "",
    stock_actuel: 0,
    statut: "actif",
    chemin_fichier: "",
    image: null,
  });

  useEffect(() => {
    async function a() {
      if (action && product) {
        setProduit({
          id_produit: product.id_produit,
          chemin_fichier: product.chemin_fichier ?? "",
          id_categorie: product.id_categorie ?? "",
          nom_produit: product.nom_produit ?? "",
          description: product.description ?? "",
          prix: product.prix ?? "",
          stock_actuel: product.stock_actuel ?? 0,
          statut: product.statut ?? "actif",
          image: null,
        });
      } else {
        setProduit({
          chemin_fichier: "",
          id_categorie: "",
          nom_produit: "",
          description: "",
          prix: "",
          stock_actuel: 0,
          statut: "actif",
          image: null,
        });
      }
    }
    a();
  }, [action, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduit({
      ...produit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const c_f = produit.chemin_fichier.trim().replace(/\s+/g, "");

    if (!action) {
      const formData = new FormData();

      formData.append("chemin_fichier", produit.chemin_fichier);
      formData.append("id_produit", produit.id_produit ?? "");
      formData.append("id_categorie", produit.id_categorie);
      formData.append("nom_produit", produit.nom_produit);
      formData.append("prix", produit.prix);
      formData.append("stock_actuel", produit.stock_actuel);
      formData.append("statut", produit.statut);
      formData.append("description", produit.description);
      if (produit.image) {
        formData.append("image", produit.image);
      }
      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_produits.php`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const result = await response.json();
      alert(
        result.message
          ? "Le produit a été ajouté avec succès"
          : "Veuillez recommencer, une erreur s'est produite",
      );
      if (result.message) onClose(); // fermeture après enregistrement
    } else {
      const data = {
        id_produit: produit.id_produit,
        id_categorie: produit.id_categorie,
        nom_produit: produit.nom_produit,
        prix: produit.prix,
        stock_actuel: produit.stock_actuel,
        statut: produit.statut,
        description: produit.description,
        chemin_fichier: produit.chemin_fichier,
      };

      const response = await fetch(
        `http://${localhost}/Boutique/src/controllers/api_produits.php`,
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
      // alert(result);

      alert(
        result.message
          ? "Le produit a été modifié avec succès"
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
    const nomFichier = `${produit.nom_produit
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase()}_${Date.now()}.${extension}`;

    setProduit((prev) => ({
      ...prev,
      image: file,
      chemin_fichier: nomFichier,
    }));
  };

  return (
    <div className="product-overlay">
      <div className="product-modal">
        <div className="modal-header">
          {action && <h2>Modifier le produit</h2>}
          {!action && <h2>Créer un produit</h2>}

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

          {produit.chemin_fichier && (
            <>
              <p className="image-name">Image : {produit.chemin_fichier}</p>

              {/* <img
                src={`/assets/Produits/${produit.chemin_fichier}`}
                alt="Produit"
                width={80}
              /> */}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Catégorie</label>

            <select
              name="id_categorie"
              value={produit.id_categorie ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Choisir une catégorie</option>

              {categories.map((categorie) => (
                <option
                  key={categorie.id_categorie}
                  value={categorie.id_categorie}
                >
                  {categorie.nom_categorie}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Nom produit</label>

            <input
              type="text"
              name="nom_produit"
              placeholder="ex. chemise blanche"
              value={produit.nom_produit ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="cette chemise est faite en lain..."
              value={produit.description ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prix</label>

              <input
                type="number"
                name="prix"
                min="0"
                step="0.01"
                placeholder="1200.00"
                value={produit.prix ?? ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>

              <input
                type="number"
                name="stock_actuel"
                placeholder="2"
                min="0"
                value={produit.stock_actuel ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Statut</label>

            <select
              name="statut"
              value={produit.statut ?? ""}
              onChange={handleChange}
            >
              <option value="actif">Actif</option>

              <option value="archiver">Archiver</option>
            </select>
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

export default CreateProduct;
