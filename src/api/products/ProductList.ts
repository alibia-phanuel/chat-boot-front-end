import axios from "axios";
import { ProductList } from "../../type/type"; // Assure-toi que le chemin est correct

export const getProducts = async (): Promise<ProductList> => {
  try {
    const response = await axios.get<ProductList>(
      "https://chat-boot-92e040193633.herokuapp.com/products"
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};
