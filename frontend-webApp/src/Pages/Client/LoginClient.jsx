import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoginForm from "../../Components/LoginForm";
import { AUTH_BACKEND_PORT } from "../../Config/URL";

const LoginClient = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const updateForm = (value) => {
    setSubmitted(true);
    setFormDetails(value);
  };

  const handleFormSubmission = () => {
    try {
      (async () => {
        await axios
          .post(`${AUTH_BACKEND_PORT}/login-client`, formDetails, {
            withCredentials: true,
          })
          .then((response) => {
            if (response?.data?.loginStatus) {
              toast.success(response?.data?.message);
              localStorage.setItem("jwtClient", response.data.token);
              navigate("/client/client-dashboard");
            } else if (response?.data?.errors)
              toast.error(response?.data?.errors?.message);
            else toast.error("Failed to create account. Please retry!");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.errors?.message);
          });
      })();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (submitted) handleFormSubmission();
    return () => {
      setSubmitted(false);
    };
  }, [submitted]);

  return (
    <>
      <div className="register_container lg:grid grid-cols-2 h-screen flex">
        <div className="lg:relative lg:block hidden  ">
          <img
            className=" lg:absolute lg:mt-96 ml-96 -z-10 scale-150 flex-shrink"
            src="/ImageUploads/singup logo.webp"
            alt=""
          />
        </div>
        <div className="m-auto lg:mt-20 lg:w-4/5 lg:ml-0 md:p-7">
          <LoginForm role="Client" updateForm={updateForm} />
        </div>
      </div>
    </>
  );
};

export default LoginClient;
