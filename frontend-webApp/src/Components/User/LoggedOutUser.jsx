import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedOutUser = ({ children }) => {
  const navigate = useNavigate();

  const jwtUser = localStorage.getItem("jwtUser");

  useEffect(() => {
    if (!jwtUser) {
      navigate("/login");
    }
  }, [jwtUser, navigate]);

  return jwtUser && <div>{children}</div>;
};

export default LoggedOutUser;
