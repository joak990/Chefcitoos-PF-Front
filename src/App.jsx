import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Views/Home";
import Nav from "./components/Nav";
import NotFound from "./Views/NotFound";
import Login from "./Views/Login";
import Menu from "./Views/Menu";
import Creaciones from "./Views/Creaciones";
import Register from "./Views/Register";
import About from "./Views/About";
import FormCreate from "./Views/FormCreate";
import Publicaciones from "./Views/Publicaciones";
import Detail from "./Views/Detail";
import LoginAdmin from "./AdminUser/LoginAdmin";
import Dashboard from "./AdminUser/Dashboard";
function App() {
  const location = useLocation();
    const hasId = localStorage.getItem("id");
  return (
    <>
      {location.pathname !== "/register" && location.pathname !== "/login"&& location.pathname !== "/admin" && location.pathname !== "/admin/account"  && (
        <Nav />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<FormCreate />} />
        {hasId && <Route path="/admin/account" element={<Dashboard />} />}
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creaciones" element={<Creaciones />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
