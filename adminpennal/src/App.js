// import logo from './logo.svg';
import './App.css';
// import AdminPanel from './Main1/AdminPanel';
import { Route, Routes } from 'react-router';
import AdminLogin from './Main1/login/Adminlogin';
import AdminRegistration from './Main1/login/Adminregistration';
import AdminPanel from './Main1/AdminPanel';
import UserAdmin from './Main1/Page/UserAdmin';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/Adminregistration" element={<AdminRegistration />} />
        <Route path="/home" element={<AdminPanel />} />
        <Route path="/user" element={<UserAdmin />} />

      </Routes>
    </>
  );
}

export default App;
