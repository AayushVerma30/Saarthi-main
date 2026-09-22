import { Navigate } from 'react-router-dom';

export default function AdminApprovalsPage() {
  return <Navigate to="/admin?tab=verification" replace />;
}
