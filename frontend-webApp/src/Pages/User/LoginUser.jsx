import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoginForm from "../../Components/LoginForm";
import { AUTH_BACKEND_PORT } from "../../Config/URL";

const LoginUser = () => {

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const updateForm = (value)=> {
    setSubmitted(true);
    setFormDetails(value);
  };

  const handleFormSubmission = () => {
    try {
      (async () => {
        await axios
          .post(`${AUTH_BACKEND_PORT}/login-user`, formDetails, {
            withCredentials: true,
          })
          .then((response) => {
            if (response?.data?.loginStatus) {
              toast.success(response?.data?.message);
              localStorage.setItem("jwtUser", response.data.token);
              navigate("/dashboard");
            } else if (response?.data?.errors)
              toast.error(response?.data?.errors?.message);
            else toast.error("Failed to create account. Please retry!");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.errors?.message);
          });
      })();
    } catch (error) {
        const { message } = error.response.data
        console.error(error);
      toast.error(message);
    }
  }

  

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
          <LoginForm
            role="Freelancer"
            updateForm={updateForm}
          />
        </div>
      </div>
    </>
  );
};

export default LoginUser;
