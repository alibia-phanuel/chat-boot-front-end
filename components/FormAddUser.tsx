import React from "react";
import LayoutSystem from "./share/LayoutSystem";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Layout from "./pages/Layout";
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const FormAddUser = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // Fonction pour gérer le changement des champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔍 Fonction de validation des données
  const validateForm = (): boolean => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      toast.error("Le nom est requis.");
      return false;
    }
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  // Fonction pour gérer la soumission du formulaire
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des champs avant soumission
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://chat-boot-92e040193633.herokuapp.com/users",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.msg || "Utilisateur ajouté avec succès !");

      // Réinitialiser le formulaire après soumission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.msg || "Une erreur est survenue");
      } else if (error instanceof Error) {
        toast.error("Erreur serveur : " + error.message);
      } else {
        toast.error("Une erreur inconnue est survenue.");
      }
    }
  };
  return (
    <Layout>
      <LayoutSystem>
        <div className="p-6 max-w-2xl mx-auto relative shadow-lg top-[15%]">
          <h1 className="text-2xl font-bold mb-2">Utilisateurs</h1>
          <div className="text-sm text-gray-600 mb-4">
            Ajouter un nouvel utilisateur
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="p-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courriel(E-mail)
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="*******"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="*******"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Administrateur</option>
                    <option value="user">Employé</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Ajouter l'utilisateur
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormAddUser;
