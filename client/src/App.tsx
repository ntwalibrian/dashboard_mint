import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Freestyle/Home";
import Create from "./Freestyle/Create";
import Edit from "./Freestyle/Edit";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Freestyle/Login";
import DashBoard from "./pages/UserDashBoard";
import SignUp from "./Freestyle/SignUp";
import ProtectedRoute from "./component.tsx/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/:id"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
