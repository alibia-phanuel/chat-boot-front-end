// Interface pour l'utilisateur
// Type pour une liste de produits
export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string; // ⚠️ Idéalement, ne pas exposer le mot de passe côté frontend
  role: "admin" | "user"; // Tu peux adapter en fonction des rôles possibles
  signupDate: string;
  createdAt: string;
  updatedAt: string;
}
// Interface pour un produit
export interface Product {
  uuid: string;
  name: string;
  price: number;
  User: User; // Relation avec l'utilisateur
}
export type ProductList = Product[];
export type UserList = User[];
