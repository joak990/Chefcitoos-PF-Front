
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import NotFound from './Views/NotFound';
import Login from './Views/Login';
import Menu from './Views/Menu';
import Creaciones from './Views/Creaciones'



function App() {
  return (
    <div >
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/creaciones" element={<Creaciones />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
      
    </div>
  );
}

export default App;
