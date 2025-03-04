import LayoutSystem from "./share/LayoutSystem";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProductDataList } from "../src/type/type";
import { FiTrash2 } from "react-icons/fi"; // Icône de suppression
import { useDropzone } from "react-dropzone";
import React from "react";
import { updateProduct } from "../src/api/products/UpdateProduct";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
const FormEditeProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Assurer que `id` est bien une string
  // États pour chaque champ du formulaire
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [productId, setProductId] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number | string>("");
  const [questions, setQuestions] = useState<string>("");
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 4) return;
    const newImages = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 4,
  });

  const removeImage = (imageName: string) => {
    setImages(images.filter((img) => img.name !== imageName));
  };
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault(); // Éviter le rechargement du formulaire

    if (!id) {
      toast.error("Identifiant du produit introuvable.");
      return;
    }

    // Validation des champs
    if (!name || !price || !productId || !shippingFee || !questions) {
      toast.error("Tous les champs sont requis !");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(shippingFee))) {
      toast.error(
        "Le prix et les frais d'expédition doivent être des nombres !"
      );
      return;
    }
    setLoading(true);
    const productData: UpdateProductDataList = {
      name: name.trim(),
      price: Number(price),
      shippingFee: Number(shippingFee),
      extraQuestions: questions,
      productIdOrKeyword: productId.trim(),
    };

    try {
      await updateProduct(id, productData);
      toast.success("Produit mis à jour avec succès !");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <LayoutSystem>
        <div className="p-6 max-w-2xl mx-auto  shadow-lg relative top-[10%]">
          <h1 className="text-3xl font-bold">Produits</h1>
          <h2 className="text-sm font-semibold mt-2">Modifier le produit</h2>

          <div className="bg-white  rounded-lg mt-4 p-6">
            <form onSubmit={handleUpdate}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID du produit ou mot clé
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="ID ou mot clé"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frais de livraison
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Frais de livraison"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Questions supplémentaires
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ajoutez des questions..."
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images du produit (4 max)
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-4 text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p>
                    Glissez-déposez vos images ici, ou cliquez pour sélectionner
                  </p>
                </div>
                <div className="flex  justify-evenly mt-6">
                  {images.map((image) => (
                    <div key={image.name} className="relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full  h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => removeImage(image.name)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                >
                  {loading ? "Mise à jour..." : "Mettre à jour"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </LayoutSystem>
    </Layout>
  );
};
export default FormEditeProduct;
