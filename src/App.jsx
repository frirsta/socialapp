import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
