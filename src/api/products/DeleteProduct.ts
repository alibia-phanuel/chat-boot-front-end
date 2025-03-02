import axios, { AxiosError } from "axios";
export const deleteProduct = async (uuid: string) => {
  const baseURL = "https://chat-boot-92e040193633.herokuapp.com/";
  try {
    const response = await axios.delete(`${baseURL}products/${uuid}`);
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
