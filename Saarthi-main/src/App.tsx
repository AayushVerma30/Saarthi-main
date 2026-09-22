import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './components/layout/LandingPage';
import AlumniDashboard from './pages/AlumniDashboard';
import NetworkPage from './pages/Network';
import MentorshipPage from './pages/Mentorship';
import OpportunitiesPage from './pages/Opportunities';
import EventsPage from './pages/Events';
import GivingPage from './pages/Giving';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<Navigate to="/" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* ALUMNI NESTED ROUTES */}
        <Route path="/alumni" element={<AppLayout role="alumni" />}>
          <Route path="home" element={<AlumniDashboard />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="jobs" element={<OpportunitiesPage />} />
          <Route path="networking" element={<NetworkPage />} />
          <Route path="fundraising" element={<GivingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* messages missing, we can route it back to home for now */}
          <Route path="messages" element={<AlumniDashboard />} />
        </Route>

        {/* STUDENT NESTED ROUTES */}
        <Route path="/student" element={<AppLayout role="student" />}>
          <Route path="home" element={<AlumniDashboard />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="jobs" element={<OpportunitiesPage />} />
          <Route path="networking" element={<NetworkPage />} />
          <Route path="fundraising" element={<GivingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="messages" element={<AlumniDashboard />} />
        </Route>

        {/* ADMIN NESTED ROUTES */}
        <Route path="/admin" element={<AppLayout role="admin" />}>
          <Route path="home" element={<AdminPage activeTab="dashboard" />} />
          <Route path="users" element={<AdminPage activeTab="users" />} />
          <Route path="verifications" element={<AdminPage activeTab="verification" />} />
          <Route path="events" element={<AdminPage activeTab="events" />} />
          <Route path="reports" element={<AdminPage activeTab="reports" />} />
        </Route>

        {/* Backwards Compatibility / Fallbacks */}
        <Route path="/home" element={<Navigate to="/alumni/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
