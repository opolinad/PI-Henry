import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/details/:idJuego" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
