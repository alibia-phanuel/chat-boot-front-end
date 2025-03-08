import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditUser from "../../components/FormEditeUser";
import { RootState } from "../../src/stores/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);

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
