import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import Nav from './components/Nav';

function App() {
  return (
    <>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />}/>
        </Routes>
    </>
  );
}

export default App;
