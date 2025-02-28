import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutSystem from "../components/share/LayoutSystem";
import { getGetQuestion } from "../src/api/faqs/QuestionList";
import { deleteQuestion } from "../src/api/faqs/DeleteQuestion";
import { Faqs } from "../src/type/type";
const QuestionsReponsesList = () => {
  const [faqs, setFaqs] = useState<Faqs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getGetQuestion();
        setFaqs(data);
      } catch (err) {
        setError("Impossible de récupérer les produits.");
        toast.error("Erreur lors du chargement des produits !");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet enssemble  ?")) {
      try {
        deleteQuestion(id);
        setFaqs(faqs.filter((faq) => faq.id !== id));
        toast.success("Produit supprimé avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression du produit !");
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-blue-500 text-lg font-semibold animate-pulse">
          Chargement...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <LayoutSystem>
      <div className="w-full flex justify-center items-center">
        <div className="p-6 container">
          <h1 className="text-2xl font-bold mb-2">Questions & Réponses</h1>
          <h2 className="text-xl text-gray-600 mb-4">
            Liste des questions et reponses associer
          </h2>
          <Link
            to="/questions-reponses/add"
            className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Ajouter un enssemble
          </Link>
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réponses
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
              {faqs.map((faq, index) => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {faq.question}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {faq.answer} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {faq.User?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {faq.User?.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/questions-reponses/edit/${faq.id}`}
                      className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Editer
                    </Link>
                    <button
                      className="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      onClick={() => handleDelete(faq.id)}
                    >
                      🗑 Supprimer
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

export default QuestionsReponsesList;
