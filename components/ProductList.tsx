import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import LayoutSystem from "../components/share/LayoutSystem";
import { getProducts } from "../src/api/products/ProductList";
import { deleteProduct } from "../src/api/products/DeleteProduct";
import { Product } from "../src/type/type";
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Impossible de récupérer les produits.");
        toast.error("Erreur lors du chargement des produits !");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (uuid: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await deleteProduct(uuid);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.uuid !== uuid)
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

  if (error)
    return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <LayoutSystem>
      <div className="w-full flex justify-center items-center">
        <div className="p-6 container">
          <h1 className="text-2xl font-bold mb-2">Produits</h1>
          <h2 className="text-xl text-gray-600 mb-4">Liste des produits</h2>
          <Link
            to="/products/add"
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 w-[190px]"
          >
            <FaPlus /> Nouveau produit
          </Link>
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
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
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
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
                    {product.User.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.User.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 flex">
                    <Link
                      to={`/products/edit/${product.uuid}`}
                      className=" px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center  gap-2"
                    >
                      <FaEdit />
                      Editer
                    </Link>
                    <button
                      className=" px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600  flex items-center  gap-2"
                      onClick={() => handleDelete(product.uuid)}
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
    </LayoutSystem>
  );
};

export default ProductList;
