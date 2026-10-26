
import './App.css'
import AuthProvider from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import MainMenu from './pages/MainMenu';
import FetchApi from './pages/FetchApi';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {



  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />}>Login</Route>
            <Route path='/register' element={<Register />}>Login</Route>
            <Route path='/' element={<Home />}>Home</Route>

            <Route element={<ProtectedRoute />}>
              <Route path='/todo' element={<MainMenu />}>Main Menu</Route>
              <Route path='/api' element={<FetchApi />}>Fetch Api</Route>
            </Route>

            <Route path='*' element={<h1>Not Found</h1>}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  );

}

export default App
