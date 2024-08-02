
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainHeader from './main/Layout/MainHeader';
import Home from './main/component/Home';
import MainNavbar from './main/Layout/MainNavbar';

function App() {
  return (
    <div >
      <MainHeader />
      <MainNavbar />
      <Routes>
      <Route path="/"   element =  {   <Home />   } />



      </Routes>

      
      

      
      
    </div>
  );
}

export default App;
