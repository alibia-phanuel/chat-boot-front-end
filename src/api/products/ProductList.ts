import axios from "axios";
import { ProductList } from "../../type/type"; // Assure-toi que le chemin est correct
interface ErrorResponse {
  message: string;
  status: number;
}
export const getProducts = async (): Promise<ProductList | ErrorResponse> => {
  const baseURL = "https://chat-boot-92e040193633.herokuapp.com/";
  try {
    const response = await axios.get<ProductList>(`${baseURL}products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios:", error.response?.data || error.message);
      return {
        message: "Erreur lors de la récupération des produits.",
        status: error.response?.status || 500,
      };
    } else {
      console.error("Erreur inconnue:", error);
      return { message: "Une erreur inconnue est survenue.", status: 500 };
    }
  }
};
