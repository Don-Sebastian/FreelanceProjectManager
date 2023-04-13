import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRoutes from "./Routes/UserRoutes";
import ClientRoutes from "./Routes/ClientRoutes";

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />

      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/client/*" element={<ClientRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
