import React from "react";
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const LoginForm= (props)=> {
  

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleErrorChange = () => {
  //   if (Object.keys(errors).length === 0) props.updateForm(user);
  // };

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) props.updateForm(data);
  }

  return (
    <>
      <div className="lg:p-5 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl lg:px-8 lg:pt-6 lg:pb-8 lg:mb-4 lg:border-8 border-4 p-5 lg:p-0 border-main-blue"
        >
          <h1 className="text-center font-bold text-2xl text-main-blue mb-4">
            {props ? `Login ${props.role}` : ""}
          </h1>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className={`shadow border rounded w-full py-2 px-3 ${
                errors.email ? "border-red-500" : "text-gray-700"
              } leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="text"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter valid Email",
                },
              })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6 relative">
            <label className=" text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border ${
                  errors.password ? "border-red-500" : "text-gray-700"
                } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                autoComplete="on"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              <label
                onClick={handleShowPassword}
                className="absolute -ml-14 mt-1 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer "
                htmlFor="toggle"
              >
                {showPassword ? "Hide" : "Show"}
              </label>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-row mb-6">
            <p className="text-gray-700 text-sm">Create an account?</p>
            <p className="ml-2 font-bold text-sm text-blue-500 hover:text-blue-800">
              {props.role === "Client" ? (
                <Link to={"/client/client-register"}>Register</Link>
              ) : (
                <Link to={"/register"}>Register</Link>
              )}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 lg:w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;