import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import Nav from './components/Nav';
import NotFound from './Views/NotFound';
import Login from './Views/Login';
import Menu from './Views/Menu';
import Creaciones from './Views/Creaciones'
import Register from './Views/Register';
import About from './Views/About';
import FormCreate from './Views/FormCreate';
import Publicaciones from './Views/Publicaciones';
import Detail from './Views/Detail';
function App() {
  const location = useLocation();
  return (
    <>
 {location.pathname !== "/register" && location.pathname !== "/" && <Nav />}
         
         <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/create" element={<FormCreate />}/>

          



          
          <Route path="/about" element={<About />}/>

          <Route path="/" element={<Login />}/>
          <Route path="/creaciones" element={<Creaciones />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="*" element={<NotFound />}/>
          <Route path="/publicaciones" element={<Publicaciones/>}/>
          
          <Route path="/register" element={<Register />}/>
          <Route path="/detail" element={<Detail/>}/>
          

        </Routes>
    </>
  );
}

export default App;
