import LayoutSystem from "./share/LayoutSystem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { updateProduct } from "../src/api/products/UpdateProduct";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const FormEditeProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Assurer que `id` est bien une string
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault(); // Éviter le rechargement du formulaire

    if (!id) {
      toast.error("Identifiant du produit introuvable.");
      return;
    }

    if (!name.trim() || !price.trim() || isNaN(Number(price))) {
      toast.error("Veuillez renseigner un nom et un prix valide.");
      return;
    }

    setLoading(true);

    try {
      await updateProduct(id, { name, price: parseFloat(price) });
      toast.success("Produit mis à jour avec succès !");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LayoutSystem>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Produits</h1>
        <h2 className="text-xl font-semibold mt-2">Modifier le produit</h2>

        <div className="bg-white shadow-md rounded-lg mt-4 p-6">
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Nom du produit
              </label>
              <input
                id="name"
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Prix
              </label>
              <input
                id="price"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutSystem>
  );
};
export default FormEditeProduct;
