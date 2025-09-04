import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DataEntryPage from './pages/DataEntryPage';
import Navbar from './components/Navbar';
import MyFeedbacksPage from './pages/MyFeedbacksPage';
import AllFeedbacksPage from './pages/AllFeedbacksPage';
import DashboardLayout from './components/DashboardLayout';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import { Box } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem("role");
  if (role?.toLowerCase() === "admin") {
    document.title = "InsightHub - Admin Panel";
  } else {
    document.title = "InsightHub - Kullanıcı Paneli";
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
    <Routes>
      <Route path="/" element={<LoginPage users={users} />} />
      <Route path="/register" element={<RegisterPage users={users} setUsers={setUsers} />} />
          <Route element={<DashboardLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/data-entry" element={<DataEntryPage />} />
            <Route path="/my-feedbacks" element={<MyFeedbacksPage />} />
            <Route path="/all-feedbacks" element={<AllFeedbacksPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
    </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
