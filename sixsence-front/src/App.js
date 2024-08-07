import Home from "./main/component/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import MainNavbar from './main/Layout/MainNavbar';


function App() {
  return (
    <div >
   
      <MainNavbar />
    
      <Routes>
        
      <Route path="/"   element =  {   <Home />   } />




      </Routes>

      
      

      
      
    </div>
  );
}

export default App;
