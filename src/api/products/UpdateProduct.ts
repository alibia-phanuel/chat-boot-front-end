import axios, { AxiosError } from "axios";

const API_URL = "https://chat-boot-92e040193633.herokuapp.com/products"; // Remplace par ton URL backend

export interface UpdateProductData {
  name?: string;
  price?: number;
}

export const updateProduct = async (uuid: string, data: UpdateProductData) => {
  try {
    const response = await axios.patch(`${API_URL}/${uuid}`, data, {
      withCredentials: true, // Si ton backend utilise des cookies pour l'auth
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.msg || "Erreur lors de la mise à jour"
      );
    }
    throw new Error("Une erreur inconnue est survenue");
  }
};
