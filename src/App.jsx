import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebase/firebase";
import Context from "./context/AuthContext";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/base/Home";
import Settings from "./pages/profile/Settings";
function App() {
  console.log(firebaseConfig);
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
