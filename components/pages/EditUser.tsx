import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditUser from "../../components/FormEditeUser";
import { AppDispatch, RootState } from "../../src/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../src/feature/authSlice";
const EditUser = () => {
  const dispatch = useDispatch<AppDispatch>(); // Appel de useDispatch dans un composant
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
