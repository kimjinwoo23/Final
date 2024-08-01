import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Items from './store/Items';
import ItemDetail from './store/ItemDetail';

function App() {
  return (
    <Routes>
      <Route path='/store' element={<Items />} />
      <Route path='/store/detail' element={<ItemDetail />} />
    </Routes>
  );
}

export default App;
