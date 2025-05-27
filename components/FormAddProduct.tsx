import React, { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiTrash2 } from "react-icons/fi";
import LayoutSystem from "./share/LayoutSystem";
import Layout from "./pages/Layout";
import "react-toastify/dist/ReactToastify.css";

type ImageType = {
  file: File;
  caption: string;
};

const MAX_IMAGES = 10;
const MAX_TEXT_FIELDS = 5;

const FormAddProduct = () => {
  const userid = localStorage.getItem("authId");
  const [productId, setProductId] = useState("");
  const [ordreEnvoi, setOrdreEnvoi] = useState<"text-first" | "images-first">(
    "text-first"
  );
  const [images, setImages] = useState<ImageType[]>([]);
  const [textFields, setTextFields] = useState<string[]>(
    Array(MAX_TEXT_FIELDS).fill("")
  );

  // Dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images autorisées.`);
        return;
      }
      const newImages = acceptedFiles.map((file) => ({ file, caption: "" }));
      setImages((prev) => [...prev, ...newImages]);
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: MAX_IMAGES,
  });

  // Supprimer une image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Modifier caption
  const updateCaption = (index: number, caption: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  // Modifier champs texte dynamiques
  const updateTextField = (index: number, value: string) => {
    setTextFields((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  // Drag & drop reorder
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };

  // Submit du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ordreEnvoi || !productId) {
      toast.error("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (images.length === 0) {
      toast.error("Veuillez ajouter au moins une image.");
      return;
    }

    const formData = new FormData();
    formData.append("productIdOrKeyword", productId);
    formData.append("ordreEnvoi", ordreEnvoi);
    if (userid) formData.append("createdBy", userid);

    images.forEach(({ file, caption }, i) => {
      formData.append("images", file);
      formData.append(`captions[${i}]`, caption);
    });

    textFields.forEach((text, i) => {
      if (text.trim() !== "") {
        formData.append(`textFields[${i}]`, text.trim());
      }
    });

    try {
      const response = await axios.post(
        "https://chat-boot-92e040193633.herokuapp.com/products",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        toast.success("Produit ajouté avec succès !");
        // Optionnel : reset form
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout du produit.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <LayoutSystem>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Ajouter un nouveau produit
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Champ mot-clé / ID */}
            <input
              type="text"
              placeholder="Mot-clé ou ID du produit"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border p-2 rounded"
              required
            />

            {/* Choix de l'ordre */}
            <div className="flex gap-4 justify-center">
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

            {/* Zone d'upload */}
            <div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>
                  Glissez-déposez vos images ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Maximum {MAX_IMAGES} images
                </p>
              </div>

              {/* Aperçu + drag&drop */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex gap-4 mt-4 overflow-x-auto"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {images.map(({ file, caption }, index) => (
                        <Draggable
                          key={file.name}
                          draggableId={file.name}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="relative w-40 flex-shrink-0"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                title="Supprimer l'image"
                              >
                                <FiTrash2 size={16} />
                              </button>
                              <textarea
                                placeholder="Caption pour cette image"
                                value={caption}
                                onChange={(e) =>
                                  updateCaption(index, e.target.value)
                                }
                                className="mt-2 border p-1 rounded w-full resize-y"
                                rows={3}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Champs texte dynamiques */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Champs texte supplémentaires</h2>
              {textFields.map((text, i) => (
                <textarea
                  key={i}
                  placeholder={`Texte ${i + 1}`}
                  value={text}
                  onChange={(e) => updateTextField(i, e.target.value)}
                  className="border p-2 rounded w-full resize-y"
                  rows={4}
                />
              ))}
            </div>

            {/* Soumission */}
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
            >
              Sauvegarder le produit
            </button>
          </form>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormAddProduct;
