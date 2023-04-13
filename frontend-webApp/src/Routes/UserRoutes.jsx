import { Route, Routes } from "react-router-dom";
import RegisterUser from "../Pages/User/RegisterUser";
import LoginUser from "../Pages/User/LoginUser";
import HomeUser from "../Pages/User/HomeUser";
import HomeUserDashboard from "../Pages/User/HomeUserDashboard";
import LoggedInUser from "../Components/User/LoggedInUser";
import NotFound from "../Pages/Notfound";
import LoggedOutUser from "../Components/User/LoggedOutUser";

function UserRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <HomeUser />
        }
      />
      <Route
        path="/register"
        element={
          <LoggedInUser>
            <RegisterUser />
          </LoggedInUser>
        }
      />
      <Route
        path="/login"
        element={
          <LoggedInUser>
            <LoginUser />
          </LoggedInUser>
        }
      />
      <Route
        path="/dashboard"
        element={
          <LoggedOutUser>
            <HomeUserDashboard />
          </LoggedOutUser>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default UserRoutes;
