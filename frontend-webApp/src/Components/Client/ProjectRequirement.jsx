import React from "react";
import { useForm } from "react-hook-form";
import useAxiosInstanceClient from "../../Instances/Interceptor/clientInterceptor";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProjectRequirement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm();
    
    const axiosPrivateClient = useAxiosInstanceClient();
    const navigate = useNavigate();

    const onSubmit = async(data) => {
      try {
          const response = await axiosPrivateClient.post('/project-requirments-details', data)
          if (response.data.status === 'success') {
              toast.success(response.data.message);
              navigate('/client/client-dashboard');
          }
      } catch (error) {
          const { message } = error.response.data;
          toast.error(message);
      }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">
        Post Your Project Requirements
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="project-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            id="project-name"
            {...register("projectName", { required: "This field is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.projectName ? "border-red-500" : ""
            }`}
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="project-description"
            className="block text-gray-700 font-bold mb-2"
          >
            Project Description
          </label>
          <textarea
            id="project-description"
            {...register("projectDescription", {
              required: "This field is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.projectDescription ? "border-red-500" : ""
            }`}
            rows="5"
            placeholder="Enter project description"
          ></textarea>
          {errors.projectDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectDescription.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="project-budget"
            className="block text-gray-700 font-bold mb-2"
          >
            Project Budget
          </label>
          <input
            type="number"
            id="project-budget"
            {...register("projectBudget", {
              pattern: {
                value: /^[0-9]{1,6}$/,
                message: "Enter Valid Price",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.projectBudget ? "border-red-500" : ""
            }`}
            placeholder="Enter project budget in Rupees"
          />
          {errors.projectBudget && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectBudget.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="project-duration"
            className="block text-gray-700 font-bold mb-2"
          >
            Project Duration
          </label>
          <input
            type="text"
            id="project-duration"
            {...register("projectDuration", {
              required: "This field is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.projectDuration ? "border-red-500" : ""
            }`}
            placeholder="Enter project duration"
          />
          {errors.projectDuration && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectDuration.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post Requirements
        </button>
      </form>
    </div>
  );
};

export default ProjectRequirement;
