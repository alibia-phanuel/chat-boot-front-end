import Layout from "./Layout";
import Welcome from "../Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/stores/store";
import { getMe } from "../../src/feature/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Styles pour les toasts
export default function Dashbord() {
  const dispatch = useDispatch<AppDispatch>(); // Appel de useDispatch dans un composant
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);
  const [hasWelcomed, setHasWelcomed] = useState(false); // État local pour gérer le toast
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  useEffect(() => {
    if (user?.name && !hasWelcomed) {
      toast.success(`Bienvenue, ${user.name}!`); // Affiche le toast
      setHasWelcomed(true); // Marque que le toast a été montré
    }
  }, [user, hasWelcomed]); // Le toast est affiché seulement si `user` est défini et `hasWelcomed` est false
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}
