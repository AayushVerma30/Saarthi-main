import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  ArrowLeft,
  Shield,
  Activity
} from 'lucide-react';
import { adminStore } from '@/lib/adminStore';
import { AdminDashboardView } from '@/components/admin/AdminDashboardView';
import { AdminUsersView } from '@/components/admin/AdminUsersView';
import { AdminVerificationView } from '@/components/admin/AdminVerificationView';
import { AdminEventsView } from '@/components/admin/AdminEventsView';
import { AdminReportsView } from '@/components/admin/AdminReportsView';

export type AdminTab = 'dashboard' | 'users' | 'verification' | 'events' | 'reports';

export default function AdminPage({ activeTab = 'dashboard' }: { activeTab?: AdminTab }) {
  const navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(adminStore.getPendingVerificationsCount());

  useEffect(() => {
    return adminStore.subscribe(() => {
      setPendingCount(adminStore.getPendingVerificationsCount());
    });
  }, []);

  const handleTabChange = (tab: AdminTab) => {
    navigate(`/admin/${tab === 'dashboard' ? 'home' : tab === 'verification' ? 'verifications' : tab}`);
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full space-y-6">
        
        {/* Tab Content Display */}
        <div>
          {activeTab === 'dashboard' && <AdminDashboardView onNavigateTab={handleTabChange} />}
          {activeTab === 'users' && <AdminUsersView />}
          {activeTab === 'verification' && <AdminVerificationView />}
          {activeTab === 'events' && <AdminEventsView />}
          {activeTab === 'reports' && <AdminReportsView />}
        </div>

      </div>
    </div>
  );
}
