import LayoutSystem from "./share/LayoutSystem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { FiTrash2 } from "react-icons/fi";
import { getProductById } from "@/api/products/GetProductById";
import Layout from "./pages/Layout";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://localhost:3000";
type FileWithUrl = File & { url: string; name: string; path?: string };

const FormEditeProduct = () => {
  const userid = localStorage.getItem("authId");
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [keyword, setKeyword] = useState("");
  const [questions, setQuestions] = useState("");
  const [images, setImages] = useState<FileWithUrl[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productData = await getProductById(id);
        if (!productData) {
          toast.error("Produit introuvable.");
          return;
        }

        setName(productData.name || "");
        setPrice(productData.price?.toString() || "");
        setShippingFee(productData.deliveryFee?.toString() || "");
        setQuestions(productData.extraQuestion || "");
        setKeyword(productData.keyword || "");
        setImages(
          productData.images?.map((img: unknown) => ({
            name: img,
            url: `${baseUrl}${img}`,
          })) || []
        );
      } catch (error) {
        toast.error("Erreur lors du chargement des informations du produit.");
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 4) return;

    const filesWithUrl: FileWithUrl[] = acceptedFiles.map((file) => ({
      ...file,
      url: URL.createObjectURL(file), // Ajoute une URL pour l'affichage
    }));

    const newImages = setImages((prevImages) => [
      ...prevImages,
      ...filesWithUrl,
    ]);
    console.log("📸 Images ajoutées :", newImages);
    return newImages;
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

    if (!name || !price || !shippingFee || !questions) {
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

    console.log("🖼️ Images soumises :", images);

    const productData = {
      name,
      price: Number(price), // S'assurer que ce sont bien des nombres
      keyword,
      deliveryFee: Number(shippingFee), // Correction du champ
      extraQuestion: questions, // Correction du champ
      createdBy: userid || undefined, // Vérification de l'ID utilisateur
    };

    console.log("📤 Données envoyées :", productData);
    console.log(id);

    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json", // 💡 Important : JSON
          },
        }
      );

      if (response.status === 200) {
        toast.success("Produit modifié avec succès !");
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
      console.error("🔥 Erreur Axios :", error);
    }
  };

  return (
    <Layout>
      <LayoutSystem>
        <div className="w-full h-[calc(100vh-70px)] bg-gray-50 flex justify-center items-center">
          <div className="p-6 bg-white rounded-lg w-[55%] max-md:w-full shadow-lg mx-4">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Modifier votre article
            </h1>
            <div className="bg-white rounded-lg">
              <div className="p-4">
                <form
                  className="gap-4 flex flex-wrap flex-col"
                  onSubmit={handleSubmit}
                >
                  <div className="flex w-full justify-center items-center gap-4">
                    <input
                      className="border p-2 rounded w-[100%]"
                      type="string"
                      placeholder="Mot-clé ou ID du produit Facebook"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input
                      className="border p-2 rounded w-[100%]"
                      type="number"
                      placeholder="Prix"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="w-full flex justify-center items-center gap-4">
                    <input
                      className="border p-2 rounded w-[100%]"
                      type="text"
                      placeholder="Nom du produit"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="border p-2 rounded w-[100%]"
                      type="number"
                      placeholder="Frais de livraison"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(e.target.value)}
                    />
                  </div>
                  <textarea
                    className="w-[100%] border p-2 rounded"
                    placeholder="Questions supplémentaires"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                  ></textarea>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 w-full text-center cursor-pointer"
                  >
                    <input type="file" multiple {...getInputProps()} />
                    <p>
                      Glissez-déposez vos images ici, ou cliquez pour
                      sélectionner
                    </p>
                  </div>
                  <div className="flex justify-evenly mt-6">
                    {images.map((image) => (
                      <div key={image.name} className="relative">
                        <img
                          src={image.url || URL.createObjectURL(image)}
                          alt={image.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          title="Supprimer l'image"
                          type="button"
                          className="absolute top-1 right-1 text-white p-1 bg-red-500 rounded-full"
                          onClick={() => removeImage(image.name)}
                        >
                          <FiTrash2
                            size={16}
                            className="text-red-100 rounded-full"
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

export default FormEditeProduct;

// const existingImages: string[] = [];
// // Fonction pour convertir un blob en fichier
// const urlToFile = async (imageUrl: string, fileName: string) => {
//   const response = await fetch(imageUrl);
//   const blob = await response.blob();
//   return new File([blob], fileName, { type: blob.type });
// };

// Ajouter images existantes et nouvelles images au FormData
// for (const image of images) {
//   if ("file" in image && image.file instanceof File) {
//     // ✅ Vérifie si l'image contient un fichier et est bien un `File`
//     formData.append("images[]", image.file);
//   } else if ("url" in image && image.url.startsWith("blob:")) {
//     // 🔄 Convertir le blob en fichier
//     const file = await urlToFile(
//       image.url,
//       image.path?.split("/").pop() || "image.jpg"
//     );
//     formData.append("images[]", file);
//   } else if (
//     "url" in image &&
//     (image.url.startsWith("http") || image.url.startsWith("/"))
//   ) {
//     // 📌 Ajouter l'image existante au tableau
//     existingImages.push(image.url);
//   }
// }
// if (existingImages.length > 0) {
//   formData.append("existingImages", JSON.stringify(existingImages));
// }
