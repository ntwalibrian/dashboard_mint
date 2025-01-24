import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stocks from "./pages/dashboard/Stocks";
import Settings from "./pages/dashboard/Settings";
import Marketplace from "./pages/dashboard/Marketplace";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <UserProvider>
              <Login />
            </UserProvider>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <UserProvider>
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            </UserProvider>
          }
        />
        <Route
          path="/dashboard/stocks"
          element={
            <UserProvider>
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            </UserProvider>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <UserProvider>
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </UserProvider>
          }
        />
        <Route
          path="/dashboard/marketplace"
          element={
            <UserProvider>
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            </UserProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
