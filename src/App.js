import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/navbar";
import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import Attendance from "./pages/Attendance";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns} timezone="Asia/Kolkata">
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/announcement" Component={Announcement} />
          <Route path="/addmember" Component={AddMember} />
          <Route path="/attendance" Component={Attendance} />
        </Routes>
      </LocalizationProvider>
    </Router>     
  );
}

export default App;
