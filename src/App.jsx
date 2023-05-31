import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import Nav from './components/Nav';
import NotFound from './Views/NotFound';
import Login from './Views/Login';
import Menu from './Views/Menu';
import Creaciones from './Views/Creaciones'







import About from './Views/About';
import FormCreate from './Views/FormCreate';
function App() {
  return (
    <>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/create" element={<FormCreate />}/>

          



          
          <Route path="/about" element={<About />}/>

          <Route path="/" element={<Login />}/>
          <Route path="/creaciones" element={<Creaciones />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="*" element={<NotFound />}/>
          

        </Routes>
    </>
  );
}

export default App;
