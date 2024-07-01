import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup'
import HomePage from './pages/donationCenterList/AdminHomePage';
import DCHomePage from './pages/donation_center/DCHomePage';
import NurseHomePage from './pages/nurse/NurseHomePage';
import DonorHomePage from './pages/donor/DonorHomePage';
import ViewPreviousAppointments from './pages/donor/ViewPreviousAppointments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-home-page" element={<HomePage />}></Route>
          <Route path='/dc-home-page' element={<DCHomePage DC_ID={9} />}></Route>
          <Route path='/nurse-home-page' element={<NurseHomePage />}></Route>
          <Route path='/donor-home-page' element={<DonorHomePage />}></Route>
          <Route path='/previous-appointments/:donorID' element={<ViewPreviousAppointments />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
