import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };
  
  // Protected Route Component
  const ProtectedRoute = ({ element} : any) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Login />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup />
              }
            />
             <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Add more protected routes here */}
              </Routes>
            </ProtectedRoute>
          }
        />
          </Routes>
      </Router>
    </>
  )
}

export default App
