import axios, { AxiosError } from "axios";

export const deleteQuestion = async (id: number) => {
  const baseURL = "http://localhost:4000";
  try {
    const response = await axios.delete(`${baseURL}/question/${id}`);
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
