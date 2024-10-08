import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NavBar from './components/shared/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import PurchasesPage from './pages/PurchasesPage';
import ProductPage from './pages/ProductPage';
import ModifyPage from './pages/ModifyPage';
import EditStorePage from './pages/EditStorePage';
import ProtectedStore from './pages/ProtectedStore';
import CategoryPage from './pages/CategoryPage';

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/category/:id' element={<CategoryPage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/purchases' element={<PurchasesPage/>}/>
          <Route path='/modify' element={<ModifyPage/>}/>
        </Route>
        <Route element={<ProtectedStore/>}>
          <Route path='/edit-store' element={<EditStorePage/>}/>
        </Route>
        <Route path='*' element={<h2>Sorry, This page hasn't been found</h2>}/>
      </Routes>
    </div>
  )
}

export default App;
