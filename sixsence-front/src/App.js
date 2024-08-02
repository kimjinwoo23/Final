import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import CustomerBoard from './component/CustomerBoard';
import CustomerWrite from './component/CustomerWrite';
import CustomerAsked from './component/CustomerAsked';
import CustomerInquiry from './component/CustomerInquiry';
import CustomerView from './component/CustomerView';
import CustomerPromise from './component/CustomerPromise';
import NavBar from './component/NavBar';


function App() {
  return (
    <div>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/customerBoard" element={<CustomerBoard/>}/>
        <Route path="/customerWrite" element={<CustomerWrite/>}/>
        <Route path="/customerAsked" element={<CustomerAsked/>}/>
        <Route path="/customerInquiry" element={<CustomerInquiry/>}/>
        <Route path="/customerView" element={<CustomerView/>}/>
        <Route path="/customerPromise" element={<CustomerPromise/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
