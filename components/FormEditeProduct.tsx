import LayoutSystem from "./share/LayoutSystem";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProductDataList } from "../src/type/type";
// import { FiTrash2 } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import { updateProduct } from "../src/api/products/UpdateProduct";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./pages/Layout";

// Définition du type pour une image
interface ImageType {
  name: string;
  url: string;
  alt?: string;
}
interface Product {
  name: string;
  price: number;
  productIdOrKeyword: string;
  shippingFee: number;

  extraQuestions: string;
  images?: ImageType[]; // Images est un tableau d'ImageType
}

const FormEditeProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // Gestion du type optionnel

  // États pour chaque champ du formulaire
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [productId, setProductId] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [questions, setQuestions] = useState<string>("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);

  // Récupérer les informations du produit par ID
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://chat-boot-92e040193633.herokuapp.com/products/${id}`
        );

        const data = response.data;

        if (data) {
          setName(data.name);
          setPrice(data.price);
          setProductId(data.productIdOrKeyword);
          setShippingFee(data.shippingFee);
          setQuestions(data.extraQuestions);
          setImages(data.images || []);
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message?: string }>;

        toast.error(
          axiosError.response?.data?.message ||
            "Erreur lors du chargement du produit"
        );
        console.error("Erreur de récupération du produit:", axiosError);
      }
    };

    fetchProduct();
  }, [id]);

  // Gestion du drop d'images
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

  // Soumission du formulaire de mise à jour
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) {
      toast.error("Identifiant du produit introuvable.");
      return;
    }

    if (!name || !price || !productId || !shippingFee || !questions) {
      toast.error("Tous les champs sont requis !");
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
        <div className="p-6 max-w-2xl mx-auto shadow-lg relative top-[10%]">
          <h1 className="text-3xl font-bold">Modifier le produit</h1>
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-lg mt-4 p-6"
          >
            <label>Nom du produit</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Prix</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label>Frais de livraison</label>
            <input
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(Number(e.target.value))}
            />

            <label>Questions supplémentaires</label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Glissez-déposez vos images ici</p>
            </div>
            {images.map((image) => (
              <div key={image.name}>
                <img src={image.url} alt={image.name} />
                <button onClick={() => removeImage(image.name)}>
                  Supprimer
                </button>
              </div>
            ))}

            <button type="submit" disabled={loading}>
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </form>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormEditeProduct;
