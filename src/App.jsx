import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Sidebar from "./components/navbar/Sidebar";
import Signin from "./pages/auth/Signin";

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
