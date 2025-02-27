import Layout from "./Layout";
import Welcome from "../Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/stores/store";
import { getMe } from "../../src/feature/authSlice";
export default function Dashbord() {
  const dispatch = useDispatch<AppDispatch>(); // Appel de useDispatch dans un composant
  const navigate = useNavigate();
  const { isError } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}
