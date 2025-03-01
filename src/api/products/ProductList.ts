import axios from "axios";
import { ProductList } from "../../type/type"; // Assure-toi que le chemin est correct

export const getProducts = async (): Promise<ProductList> => {
  const baseURL = "http://localhost:4000";
  try {
    const response = await axios.get<ProductList>(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};
