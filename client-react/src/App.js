import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


import Sigin from "./Pages/Sigin";
import Main from "./Pages/Main";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sigin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Main" element={<Main/>} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
