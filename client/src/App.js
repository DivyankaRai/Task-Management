import Task from "./Pages/Task";
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Pages/Register";

function App() {
  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/register" element={<Register />} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
