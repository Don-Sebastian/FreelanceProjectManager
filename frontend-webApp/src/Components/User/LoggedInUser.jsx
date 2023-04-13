import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedInUser = ({ children }) => {
    const navigate = useNavigate();

    const jwtUser = localStorage.getItem("jwtUser");

    useEffect(() => {
      if (jwtUser) navigate("/dashboard");
    }, [jwtUser, navigate]);

    return !jwtUser && <div>{children}</div>
}

export default LoggedInUser;