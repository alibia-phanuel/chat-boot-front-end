import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthGuard;
