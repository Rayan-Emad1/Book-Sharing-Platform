import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";


import Sigin from "./Pages/Sigin";
import Main from "./Pages/Main";
import Register from "./Pages/Register";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sigin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Main" element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
