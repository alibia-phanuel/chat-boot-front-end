import Layout from "./Layout";
import UsersList from "../../components/UsersList";
import { AppDispatch, RootState } from "../../src/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMe } from "../../src/feature/authSlice";
const Users = () => {
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
      <UsersList />
    </Layout>
  );
};

export default Users;
