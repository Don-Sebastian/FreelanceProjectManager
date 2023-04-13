import React, { useState, useEffect } from "react";
import useAxiosInstanceUser from "../../Instances/Interceptor/userInterceptor";
import { toast } from "react-hot-toast";

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const axiosPrivateUser = useAxiosInstanceUser();
    
    const fetchProjects = async () => {
        try {
            const { data } = await axiosPrivateUser.get("/all-active-products");
            setProjects(data.projects);
        } catch (error) {
            const { message } = error.response.data;
            toast.error(message);
        }
      
    };

    const handleApply = async(projectId) => {
        try {
            const { data } = await axiosPrivateUser.get(`/apply-project-user/${projectId}`)
            if(data.status === 'success') toast.success(data.message)
        } catch (error) {
            console.error(error);
            const { message } = error.response.data;
            toast.error(message);
        }
    }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Active Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">
                Name: {project.projectName}
              </h2>
              <p className="text-gray-700 text-base mb-2">
                Description: {project.projectDescription}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <strong>Budget: </strong>₹ {project.projectBudget}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <strong>Duration: </strong>
                {project.projectDuration}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleApply(project._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
