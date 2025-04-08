import axios, { AxiosError } from "axios";
export const deleteProduct = async (id: number) => {
  const baseURL = "http://localhost:3000";
  try {
    const response = await axios.delete(`${baseURL}/products/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.msg || "Erreur lors de la suppression"
      );
    }
    throw new Error("Une erreur inconnue est survenue");
  }
};
