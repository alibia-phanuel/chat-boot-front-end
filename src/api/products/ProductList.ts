import { ProductList } from "@/type/type";
import axios from "axios";
// Définition du type ErrorResponse
interface ErrorData {
  errorCode?: string;
  errorMessage?: string;
}

interface ErrorResponse {
  message: string;
  status: number;
  data?: ErrorData; // Utilisation de ErrorData au lieu de unknown
  url?: string;
}
export const getProducts = async (): Promise<ProductList | ErrorResponse> => {
  const baseURL = "https://chat-boot-92e040193633.herokuapp.com/";
  try {
    const response = await axios.get<ProductList>(`${baseURL}products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios:");
      console.error("URL de la requête:", error.config.url);
      console.error("Statut de la réponse:", error.response?.status);
      console.error("Données de l'erreur:", error.response?.data);
      console.error("Message d'erreur:", error.message);

      return {
        message: "Erreur lors de la récupération des produits.",
        status: error.response?.status || 500,
        data: (error.response?.data as ErrorData) || {}, // Cast à ErrorData ou objet vide
        url: error.config.url || "",
      };
    } else {
      // Vérification si 'error' peut être traité comme un ErrorData
      const errorData = isErrorData(error)
        ? error
        : { errorMessage: "Une erreur inconnue est survenue." };

      console.error("Erreur inconnue:", error);
      return {
        message: "Une erreur inconnue est survenue.",
        status: 500,
        data: errorData, // Assigner l'erreur à 'data'
        url: "",
      };
    }
  }
};

// Type guard pour vérifier si 'error' correspond à ErrorData
function isErrorData(error: unknown): error is ErrorData {
  return typeof error === "object" && error !== null && "errorCode" in error;
}
