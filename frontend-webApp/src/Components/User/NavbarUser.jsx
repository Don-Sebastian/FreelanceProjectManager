import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInstanceUser from "../../Instances/Interceptor/userInterceptor";

const NavbarUser = ({ loggedOut }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const axiosPrivateUser = useAxiosInstanceUser();

  const handleLogout = () => {
    localStorage.removeItem("jwtUser");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const getClientData = async () => {
    try {
      const response = await axiosPrivateUser.get("/user-details");
      setUser(response.data.user);
    } catch (error) {
      setUser("");
    }
  };
  useEffect(() => {
    getClientData();
  }, []);

  return (
    <nav className="bg-main-blue h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-gray-300 font-semibold text-2xl hover:text-white"
            >
              Freelance Pro
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {!loggedOut && (
                <>
                  <span className="text-gray-300 mr-10">{user}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white px-3 py-2 border rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {!loggedOut && (
            <>
              <div className="text-gray-300 mb-2">{user}</div>
              <button
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
