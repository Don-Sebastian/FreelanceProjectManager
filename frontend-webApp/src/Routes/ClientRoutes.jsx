import { Route, Routes } from "react-router-dom";
import RegisterClient from "../Pages/Client/RegisterClient";
import HomeClient from "../Pages/Client/HomeClient";
import HomeClientDashboard from "../Pages/Client/HomeClientDashboard";
import LoginClient from "../Pages/Client/LoginClient";
import LoggedInClient from "../Components/Client/LoggedInClient";
import PostProjectRequirementPage from "../Pages/Client/PostProjectRequirementPage";
import LoggedOutClient from "../Components/Client/LoggedOutClient";
import NotFound from "../Pages/Notfound";

function ClientRoutes() {
  return (
    <Routes>
      <Route
        path="/client-register"
        element={
          <LoggedInClient>
            <RegisterClient />
          </LoggedInClient>
        }
      />
      <Route
        path="/client-login"
        element={
          <LoggedInClient>
            <LoginClient />
          </LoggedInClient>
        }
      />
      <Route
        path="/client-dashboard"
        element={
          <LoggedOutClient>
            <HomeClientDashboard />
          </LoggedOutClient>
        }
      />
      <Route
        path="/post-requirements"
        element={
          <LoggedOutClient>
            <PostProjectRequirementPage />
          </LoggedOutClient>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ClientRoutes;
