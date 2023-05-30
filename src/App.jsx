
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import NotFound from './Views/NotFound';

function App() {
  return (
    <div >
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      
    </div>
  );
}

export default App;
