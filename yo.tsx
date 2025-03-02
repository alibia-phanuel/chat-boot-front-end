import React from 'react'

export default function yo() {
  return (
    <div>
      {" "}
      <div className="p-6 max-w-2xl mx-auto relative shadow-lg top-[5%] ">
        <h1 className="text-2xl font-bold mb-2">Ajouter un nouveau produit</h1>
        <div className="text-xl text-gray-600 mb-4">
          Ajouter de nouveaux détails sur le produit
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID du produit ou mot clé
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="ID ou mot clé"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix du produit
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frais de livraison
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Frais de livraison"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Questions supplémentaires
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ajoutez des questions..."
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images du produit (4 max)
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-4 text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p>
                    Glissez-déposez vos images ici, ou cliquez pour sélectionner
                  </p>
                </div>
                <div className="flex  justify-evenly mt-6">
                  {images.map((image) => (
                    <div key={image.name} className="relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full  h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => removeImage(image.name)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sauvegarder le produit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
