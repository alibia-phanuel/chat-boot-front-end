import axios, { AxiosError } from "axios";
export interface faqsData {
  question: string;
  answer: string;
}

export const UpdateFaqsDatas = async (id: string, data: faqsData) => {
  const baseURL = "https://chat-boot-92e040193633.herokuapp.com";
  try {
    const response = await axios.patch(`${baseURL}/question/${id}`, data, {
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
