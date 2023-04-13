import { Link } from "react-router-dom";

const HomeUser = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8 text-main-blue">
        Welcome to Freelance Pro!
      </h1>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-main-blue">Freelancer</h2>
          <p className="mb-4">Looking for work opportunities?</p>
          <Link
            to="/register"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Register as Freelancer
          </Link>
          <div className="text-blue-500  mt-2">
            Already have an account?
            <Link
              to="/login"
              className="text-main-blue hover:underline font-semibold"
            >
              Login here.
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-main-blue">Client</h2>
          <p className="mb-4">Looking to pitch a product?</p>
          <Link
            to="/client/client-register"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Register as Client
          </Link>
          <div className="text-blue-500  mt-2">
            Already have an account?
            <Link
              to="/client/client-login"
              className="text-main-blue hover:underline font-semibold"
            >
              Login here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
