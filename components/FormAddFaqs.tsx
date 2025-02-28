import Layout from "./pages/Layout";
import React from "react";
import LayoutSystem from "./share/LayoutSystem";

const FormAddFaqs = () => {
  return (
    <Layout>
      <LayoutSystem>
        <div className="p-6 max-w-2xl mx-auto relative shadow-lg top-[15%]">
          <h1 className="text-2xl font-bold mb-2">Questions/Réponses</h1>
          <div className="text-sm text-gray-600 mb-4">
            Ajouter un nouvel enssemble
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Questions
                  </label>
                  <input
                    name="name"
                    // value={formData.name}
                    // onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Réponses
                  </label>
                  <input
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Ajouter un emssemble
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutSystem>
    </Layout>
  );
};

export default FormAddFaqs;
