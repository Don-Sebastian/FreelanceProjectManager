import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AUTH_BACKEND_PORT } from "../../Config/URL";
import RegisterForm from "../../Components/RegisterForm";

const RegisterClient = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const updateForm = (value) => {
    setSubmitted(true);
    setFormDetails(value);
  };

  const handleSubmit = () => {
    try {
      (async () => {
        await axios
          .post(`${AUTH_BACKEND_PORT}/register-client`, formDetails, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.data.status === "success") {
              toast.success(response.data.message);
              localStorage.setItem("jwtClient", response.data.token);
              navigate("/client/client-dashboard");
            } else if (response.data.errors)
              toast.error(response.data.errors.message);
            else toast.error("Failed to create account. Please retry!");
          })
          .catch((error) => {
            toast.error(error.response.data.errors.message);
          });
      })();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (submitted) handleSubmit();
    return () => {
      setSubmitted(false);
    };
  }, [submitted]);

  return (
    <>
      <div className="register_container lg:grid grid-cols-2 h-screen flex">
        <div className="m-auto lg:w-4/5 lg:mr-0 md:p-7">
          <RegisterForm role="Client" updateForm={updateForm} />
        </div>
        <div className="lg:relative lg:block hidden  ">
          <img
            className=" lg:absolute lg:mt-96 -ml-10 -z-10 scale-150 flex-shrink"
            src="/ImageUploads/singup logo.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default RegisterClient;
