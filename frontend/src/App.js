import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLanding from "./Pages/AdminLanding";
import UserLanding from "./Pages/UserLanding";
import Dashboard from "./Pages/UserSections/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLanding />} />
          <Route path="/user/*" element={<UserLanding />} />
          <Route path="/home/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
