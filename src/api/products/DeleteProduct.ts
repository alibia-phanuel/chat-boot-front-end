import axios, { AxiosError } from "axios";
export const deleteProduct = async (uuid: string) => {
  try {
    const response = await axios.delete(
      `https://chat-boot-92e040193633.herokuapp.com/products/${uuid}`
    );
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
