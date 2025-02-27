import LayoutSystem from "./share/LayoutSystem";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormAddProduct = () => {
  // États pour chaque champ du formulaire
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir price en string pour éviter l'erreur `.trim()`
    const priceStr = String(price).trim();

    // Vérification des champs
    if (!name.trim()) {
      toast.error("Le nom du produit est requis.");
      return;
    }
    if (!priceStr || isNaN(Number(priceStr)) || Number(priceStr) <= 0) {
      toast.error("Veuillez entrer un prix valide.");
      return;
    }

    try {
      const response = await axios.post(
        "https://chat-boot-92e040193633.herokuapp.com/products",
        { name, price: Number(priceStr) } // Convertir price en number
      );

      toast.success(response.data.msg || "Produit ajouté avec succès !");

      // Réinitialiser les champs après succès
      setName("");
      setPrice("");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du produit. Veuillez réessayer.");
    }
  };
  return (
    <LayoutSystem>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Ajouter un nouveau produit </h1>
        <div className="text-xl text-gray-600 mb-4">
          Ajouter de nouveaux détails sur le produit
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix du produit
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sauvegarder le produit
              </button>
            </form>
          </div>
        </div>
      </div>
    </LayoutSystem>
  );
};

export default FormAddProduct;
