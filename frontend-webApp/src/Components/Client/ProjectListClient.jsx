import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosInstanceClient from "../../Instances/Interceptor/clientInterceptor";

const ListProjectClient = (props) => {
  const [projects, setProjects] = useState([]);
  const axiosPrivateClient = useAxiosInstanceClient();

    const fetchProjects = async () => {
    try {
      const { data } = await axiosPrivateClient.get("/project-list-client");
      setProjects(data.projects);
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <Link
          to={`/client/post-requirements`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-main-blue"
        >
          Create Project
        </Link>
      </div>
      <div className=" sm:rounded-md ">
        <div className="">
          {projects.map((project) => (
            <div
              key={project._id}
              className="p-4 rounded-2xl border border-main-blue mb-10"
            >
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Name: {project.projectName}
                    </h3>
                    <h4 className="font-semibold text-lg">Project Details</h4>
                    <p className="text-gray-600">
                      {project.projectDescription}
                    </p>
                  </div>

                  <div>
                    <div>
                      <p className=" font-semibold">Budget:</p>
                      <p className="font-bold">₹ {project.projectBudget}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration:</p>
                      <p className="font-bold">{project.projectDuration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status:</p>
                      <p className="font-bold">{project.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Created At:</p>
                      <p className="font-bold">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-lg">
                  Applicants ({project.applicantsDetails.length})
                </h4>
                <ul className="mt-2">
                  {project.applicantsDetails.map((applicant) => {
                    if (applicant) {
                      return (
                        <li
                          key={applicant._id}
                          className="flex items-center mt-2"
                        >
                          <div>
                            <h5 className="font-bold">{applicant.name}</h5>
                            <p className="text-gray-600">{applicant.email}</p>
                          </div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProjectClient;
