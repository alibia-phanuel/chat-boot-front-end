import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutSystem from "../components/share/LayoutSystem";
import { deleteProduct } from "../src/api/products/DeleteProduct";
import axios from "axios";
import useUserStore from "../stores/userStore";
type Product = {
  id: number;
  uuid: string;
  keyword: string;
  name: string;
  price: number;
  deliveryFee: number;
  extraQuestion: string;
  creator: {
    name: string;
    role: string;
  };
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://chat-boot-92e040193633.herokuapp.com/products"
        );
        setProducts(response.data); // On récupère les données
      } catch (err) {
        toast.error("Erreur lors de la récupération des données");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const role = user?.role ?? "inconnu"; // Si user est null, on assigne "inconnu" par défaut
    if (role !== "admin") {
      toast.error("Vous n'êtes pas autorisé à supprimer ce produit !");
      return; // Arrête l'exécution si l'utilisateur n'est pas admin
    }
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await deleteProduct(id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        toast.success("Produit supprimé avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression du produit !");
        console.error(error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );

  return (
    <LayoutSystem>
      <div className=" flex justify-center  h-full bg-gray-50 w-full">
        <div className="p-6 container">
          <h1 className="text-2xl font-bold mb-2">Produits</h1>
          <h2 className="text-xl text-gray-600 mb-4">Liste des produits</h2>
          <Link
            to="/products/add"
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 w-[190px]"
          >
            <FaPlus /> Nouveau produit
          </Link>
          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    autheur
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
                {products.map((product, index) => (
                  <tr key={product.uuid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.price} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.creator.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.creator.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2 flex">
                      <Link
                        to={`/products/edit/${product.uuid}`}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2"
                      >
                        <FaEdit />
                        Editer
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center gap-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash />
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutSystem>
  );
};

export default ProductList;
