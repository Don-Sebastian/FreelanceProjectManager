import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedInClient = ({ children }) => {
  const navigate = useNavigate();

  const jwtClient = localStorage.getItem("jwtClient");

  useEffect(() => {
    if (jwtClient) navigate("/client/client-dashboard");
  }, [jwtClient, navigate]);

  return !jwtClient && <div>{children}</div>;
};

export default LoggedInClient;
