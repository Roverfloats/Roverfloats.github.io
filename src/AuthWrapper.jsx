import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}

export default AuthWrapper