
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
     <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Signup/>}/>


     </Routes>
    </div>
  );
}

export default App;
