import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './LoginPage/LoginPage';
import App from './App';
function Dashboard() {
  return (
    <div >
     
          <Routes>
           
          <Route path="/"  element={<Login />} />
          <Route path="/App"  element={<App />} />

         

            
          </Routes>
    </div>
  );
}

export default Dashboard;

{/* <Route path='/cameralist' element={<CameraDevice/>}></Route> */}