import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { getUsers } from "../src/api/users/GetUser";
import { User } from "../src/type/type";
import axios from "axios";
export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Impossible de récupérer les utilisateurs.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const deleteUser = async (uuid: string) => {
    // Demander confirmation avant de supprimer
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      return;

    try {
      // Faire une requête DELETE pour supprimer l'utilisateur
      const response = await axios.delete(
        `https://chat-boot-92e040193633.herokuapp.com/users/${uuid}`
      );

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        // Si la suppression est réussie, mettre à jour l'état pour enlever l'utilisateur de la liste
        setUsers((prevUsers) => prevUsers.filter((user) => user.uuid !== uuid));
        alert("Utilisateur supprimé avec succès !");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Gérer les erreurs
      if (error.response) {
        alert("Erreur lors de la suppression : " + error.response.data.msg);
      } else {
        alert("Erreur serveur : " + error.message);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <h2 className="text-xl text-gray-600 mb-4">List of Users</h2>
      <Link
        to="/users/add"
        className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add New
      </Link>
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.uuid} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
