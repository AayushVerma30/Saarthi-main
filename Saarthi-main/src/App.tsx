import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AppLayout from './components/layout/AppLayout';
import AlumniDashboard from './pages/AlumniDashboard';
import NetworkPage from './pages/Network';
import MentorshipPage from './pages/Mentorship';
import OpportunitiesPage from './pages/Opportunities';
import EventsPage from './pages/Events';
import GivingPage from './pages/Giving';
import ProfilePage from './pages/Profile';
import MessagesPage from './pages/Messages';
import AdminPage from './pages/AdminPage';

function App() {
  const getRolePrefix = () => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') return '/admin/home';
    if (role === 'student') return '/student';
    return '/alumni';
  };

  const rolePrefix = getRolePrefix();

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
          <Route path="messages" element={<MessagesPage />} />
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
          <Route path="messages" element={<MessagesPage />} />
        </Route>

        {/* ADMIN NESTED ROUTES */}
        <Route path="/admin" element={<AppLayout role="admin" />}>
          <Route path="home" element={<AdminPage activeTab="dashboard" />} />
          <Route path="users" element={<AdminPage activeTab="users" />} />
          <Route path="verifications" element={<AdminPage activeTab="verification" />} />
          <Route path="events" element={<AdminPage activeTab="events" />} />
          <Route path="reports" element={<AdminPage activeTab="reports" />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallbacks & Direct Links */}
        <Route path="/home" element={<Navigate to={`${rolePrefix}/home`} replace />} />
        <Route path="/events" element={<Navigate to={`${rolePrefix}/events`} replace />} />
        <Route path="/mentorship" element={<Navigate to={`${rolePrefix}/mentorship`} replace />} />
        <Route path="/jobs" element={<Navigate to={`${rolePrefix}/jobs`} replace />} />
        <Route path="/opportunities" element={<Navigate to={`${rolePrefix}/jobs`} replace />} />
        <Route path="/networking" element={<Navigate to={`${rolePrefix}/networking`} replace />} />
        <Route path="/messages" element={<Navigate to={`${rolePrefix}/messages`} replace />} />
        <Route path="/giving" element={<Navigate to={`${rolePrefix}/fundraising`} replace />} />
        <Route path="/fundraising" element={<Navigate to={`${rolePrefix}/fundraising`} replace />} />
        <Route path="/profile" element={<Navigate to={`${rolePrefix}/profile`} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
