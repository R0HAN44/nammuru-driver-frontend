import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import { Toaster } from '@/components/ui/sonner';
import { Sample } from './pages/Sample';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerBooking from './pages/customer/CustomerBooking';
import RideStatus from './pages/customer/RideStatus';
import RideSummary from './pages/customer/RideSummary';
import RideHistory from './pages/customer/RideHistory';
import Profile from './pages/customer/Profile';
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverNavigation from './pages/driver/Navigation';
import DriverRideStatus from './pages/driver/RideStatus';
import DriverEarnings from './pages/driver/Earnings';
import DriverProfile from './pages/driver/Profile';
import BookingStatus from './pages/customer/BookingStatus';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  console.log(localStorage.getItem('token'));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sam"
            element={
              <ProtectedRoute>
                <Sample />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <CustomerBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/booking-status"
            element={
              <ProtectedRoute>
                <BookingStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride/status"
            element={
              <ProtectedRoute>
                <RideStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride/summary"
            element={
              <ProtectedRoute>
                <RideSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <RideHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/dashboard"
            element={
              <ProtectedRoute>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/navigation"
            element={
              <ProtectedRoute>
                <DriverNavigation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/ride-status"
            element={
              <ProtectedRoute>
                <DriverRideStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/earnings"
            element={
              <ProtectedRoute>
                <DriverEarnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/profile"
            element={
              <ProtectedRoute>
                <DriverProfile />
              </ProtectedRoute>
            }
          />


          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
