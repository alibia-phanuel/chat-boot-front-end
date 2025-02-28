import LayoutSystem from "./share/LayoutSystem";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../src/api/users/UpdateUser";
import { toast } from "react-toastify";
import Layout from "./pages/Layout";
interface User {
  name: string;
  email: string;
  role: string;
}

const FormEditeUser = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const { name, email, role } = formData;

    if (!name.trim()) {
      toast.error("Le nom est requis.");
      return false;
    }
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return false;
    }
    if (!role.trim()) {
      toast.error("Veuillez sélectionner un rôle.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast.error("Identifiant introuvable.");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateUser(id, formData);
      toast.success("Utilisateur mis à jour avec succès !");
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LayoutSystem>
        <div className="p-6 max-w-2xl mx-auto shadow-lg relative top-[25%]">
          <h1 className="text-2xl font-bold mb-6">Modifier un utilisateur</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez un nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez un email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Admin</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormEditeUser;
