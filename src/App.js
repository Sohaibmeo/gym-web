import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/navbar";
import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    // Store the token in client-side storage (e.g., localStorage)
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear the token from client-side storage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns} timezone="Asia/Kolkata">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/addmember" element={<AddMember />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
        <ToastContainer 
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </LocalizationProvider>
    </Router>
  );
}

export default App;
