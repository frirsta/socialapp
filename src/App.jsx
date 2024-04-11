import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Context from "./context/AuthContext";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/base/Home";
import Settings from "./pages/profile/Settings";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
