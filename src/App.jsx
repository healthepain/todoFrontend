


import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import MainMenu from './pages/MainMenu';
import FetchApi from './pages/FetchApi';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}>Login</Route>

          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}>Home</Route>
          <Route path='/todo/:id' element={<MainMenu />}>Main Menu</Route>
          <Route path='/api' element={<FetchApi />}>Fetch Api</Route>

          <Route path='*' element={<h1>Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );

}

export default App
