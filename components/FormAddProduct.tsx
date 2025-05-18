import LayoutSystem from "./share/LayoutSystem";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { FiTrash2 } from "react-icons/fi";
import Layout from "./pages/Layout";
import "react-toastify/dist/ReactToastify.css";
const FormAddProduct = () => {
  const userid = localStorage.getItem("authId");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [questions, setQuestions] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [ordreEnvoi, setOrdreEnvoi] = useState<"text-first" | "images-first">(
    "text-first"
  );
  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 4) return;
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrice("10000");
    if (!name || !productId || !shippingFee || !questions || !ordreEnvoi) {
      toast.error("Tous les champs sont requis !");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(shippingFee))) {
      toast.error(
        "Le prix et les frais d'expédition doivent être des nombres !"
      );
      return;
    }

    if (images.length === 0) {
      toast.error("Vous devez ajouter au moins une image !");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("productIdOrKeyword", productId);
    formData.append("shippingFee", shippingFee);
    formData.append("extraQuestions", questions);
    formData.append("ordreEnvoi", ordreEnvoi);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    if (!userid) {
      toast.error("L'utilisateur doit être défini !");
    }
    if (userid !== null) {
      formData.append("createdBy", userid);
    }
    images.forEach((image) => {
      formData.append("images", image); // Assurez-vous que `image.file` est bien un fichier
    });

    // console.log("Données envoyées :", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(
        "https://chat-boot-92e040193633.herokuapp.com/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        toast.success("Produit ajouté avec succès !");
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
      console.error(error);
    }
  };
  return (
    <Layout>
      <LayoutSystem>
        <div className="w-full h-[calc(100vh-70px)] bg-gray-50 flex justify-center items-center">
          <div className="p-6 bg-white rounded-lg w-[55%] max-md:w-full shadow-lg  mx-4">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Ajouter un nouveau produit
            </h1>

            <div className="text-xl text-gray-600 mb-4 text-center">
              Ajouter de nouveaux détails sur le produit
            </div>
            <div className="bg-white rounded-lg">
              <div className="p-4">
                <form
                  className="gap-4 flex flex-wrap flex-col"
                  onSubmit={handleSubmit}
                >
                  {/* Champs de saisie */}
                  <div className="flex w-full  justify-center items-center gap-4">
                    <input
                      className="border p-2 rounded w-[100%]"
                      type="text"
                      placeholder="Mot-clé ou ID du produit Facebook"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                    <input
                      className=" border p-2 rounded w-[100%] hidden"
                      type="number"
                      placeholder="Prix"
                      value="0000"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-800  ">
                      Caption ("le caption sera affiché en bas de l'image mais
                      coller a l'image")
                    </label>
                    <div className="w-full  my-4 flex justify-center items-center gap-4">
                      <div className="w-full flex flex-col">
                        <input
                          className="border p-2 rounded w-full"
                          type="text"
                          placeholder="Nom du produit"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <input
                          className="border p-2 rounded w-full"
                          type="number"
                          placeholder="Frais de livraison"
                          value={shippingFee}
                          onChange={(e) => setShippingFee(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-800   w-full">
                      Texte long ("le texte long sera affiché en bas de l'image
                      mais decoler de l'image")
                    </label>
                    <textarea
                      className="w-[100%]  my-4 border p-2 rounded"
                      placeholder="Texte supplémentaires"
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold mb-2  text-center">
                      Ordre d’envoi du message WhatsApp
                    </p>
                    <div className="flex gap-4  justify-center items-center ">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ordreEnvoi"
                          value="text-first"
                          checked={ordreEnvoi === "text-first"}
                          onChange={() => setOrdreEnvoi("text-first")}
                        />
                        Texte d’abord
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ordreEnvoi"
                          value="images-first"
                          checked={ordreEnvoi === "images-first"}
                          onChange={() => setOrdreEnvoi("images-first")}
                        />
                        Images d’abord
                      </label>
                    </div>
                  </div>
                  {/* Upload d'images */}
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 w-full text-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Glissez-déposez vos images ici, ou cliquez pour
                      sélectionner
                    </p>
                  </div>
                  <div className="flex justify-evenly mt-6">
                    {images.map((image) => (
                      <div key={image.name} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          title="Supprimer l'image"
                          type="button"
                          className="absolute top-1 right-1 text-white p-1  rounded-full"
                          onClick={() => removeImage(image.name)}
                        >
                          <FiTrash2
                            size={16}
                            className="text-red-100  rounded-full "
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Sauvegarder le produit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormAddProduct;
