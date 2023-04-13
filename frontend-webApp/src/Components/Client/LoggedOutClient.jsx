import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedOutClient = ({ children }) => {
  const navigate = useNavigate();

  const jwtClient = localStorage.getItem("jwtClient");

  useEffect(() => {
    if (!jwtClient) {
      navigate("/client/client-login");
    }
  }, [jwtClient, navigate]);

  return jwtClient && <div>{children}</div> ;
};

export default LoggedOutClient;
