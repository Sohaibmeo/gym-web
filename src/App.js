import { LocalizationProvider } from "@mui/x-date-pickers";
import Navbar from "./components/Navbar/navbar";
import AddMember from "./pages/addMember";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
function App() {
  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDateFns} timezone="Asia/Kolkata">
    <Navbar />
    <AddMember />
    </LocalizationProvider>
    </div>
  );
}

export default App;
