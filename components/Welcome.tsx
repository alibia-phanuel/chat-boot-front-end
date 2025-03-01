import LayoutSystem from "./share/LayoutSystem";
import { FaChartLine, FaEnvelope, FaBoxOpen } from "react-icons/fa"; // Exemple d'icônes
const Welcome = () => {
  return (
    <LayoutSystem>
      {/* Main Dashboard Content */}
      <div className="flex justify-center items-center  h-full">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaChartLine className="mr-2" /> Statistiques
              </h3>
              <p className="text-gray-600">
                Statistiques du site ou des données générales...
              </p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaEnvelope className="mr-2" /> Messages
              </h3>
              <p className="text-gray-600">Derniers messages ou alertes...</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaBoxOpen className="mr-2" /> Produits récents
              </h3>
              <p className="text-gray-600">
                Produits ajoutés récemment ou autres informations pertinentes...
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutSystem>
  );
};

export default Welcome;
