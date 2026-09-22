import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  GraduationCap, 
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { adminStore, UserRecord, UserRole, VerificationStatus } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DEPARTMENTS = [
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Management Studies',
  'Applied Sciences & Humanities'
];

export const AdminUsersView: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>(adminStore.getUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | VerificationStatus>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Alumni' as UserRole,
    department: 'Computer Science and Engineering',
    batch: 2022,
    enrollmentNumber: '',
    verificationStatus: 'Verified' as VerificationStatus,
    designationOrDegree: '',
    organizationOrCampus: '',
    city: 'Bengaluru',
  });

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setUsers(adminStore.getUsers());
    });
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.verificationStatus === statusFilter;
    const matchesDept = departmentFilter === 'All' || u.department === departmentFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesDept;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.fullName || !newUser.email || !newUser.enrollmentNumber) return;

    adminStore.addUser(newUser);
    setIsAddModalOpen(false);
    setNewUser({
      fullName: '',
      email: '',
      phone: '',
      role: 'Alumni',
      department: 'Computer Science and Engineering',
      batch: 2022,
      enrollmentNumber: '',
      verificationStatus: 'Verified',
      designationOrDegree: '',
      organizationOrCampus: '',
      city: 'Bengaluru',
    });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    adminStore.updateUser(editingUser.id, editingUser);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the institutional registry?`)) {
      adminStore.deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-brand-btn" />
            Institutional User Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Maintain official academic records, verify credentials, and manage privileges for alumni, students, and faculty.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => adminStore.exportUsersCSV()}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>

          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-brand-deep hover:bg-brand-btn text-white rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search name, roll number, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50/70 border-slate-200 rounded-xl text-sm"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-glow/40"
            >
              <option value="All">All Roles (Alumni, Student, Faculty)</option>
              <option value="Alumni">Alumni Only</option>
              <option value="Student">Students Only</option>
              <option value="Faculty">Faculty Only</option>
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-glow/40"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Pending">Pending Verification</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-glow/40 truncate"
            >
              <option value="All">All Academic Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Showing {filteredUsers.length} of {users.length} institutional accounts</span>
          {(searchQuery || roleFilter !== 'All' || statusFilter !== 'All' || departmentFilter !== 'All') && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setRoleFilter('All');
                setStatusFilter('All');
                setDepartmentFilter('All');
              }}
              className="text-brand-btn hover:text-brand-deep font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200/80 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-5 py-4">Member Name & ID</th>
                <th className="px-5 py-4">Role & Batch</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Current Affiliation</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{user.fullName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{user.enrollmentNumber}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {user.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Alumni' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60' :
                      user.role === 'Student' ? 'bg-blue-50 text-blue-800 border border-blue-200/60' :
                      'bg-purple-50 text-purple-800 border border-purple-200/60'
                    }`}>
                      {user.role}
                    </span>
                    <div className="text-xs text-slate-500 mt-1 font-medium">
                      Class of {user.batch}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    <div className="font-medium text-xs md:text-sm">{user.department}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{user.city}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600 text-xs">
                    <div className="font-semibold text-slate-800">{user.designationOrDegree || 'General Member'}</div>
                    <div className="text-slate-500 mt-0.5">{user.organizationOrCampus || 'Institution'}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                      user.verificationStatus === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {user.verificationStatus === 'Verified' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {user.verificationStatus === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {user.verificationStatus === 'Rejected' && <AlertCircle className="w-3.5 h-3.5" />}
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingUser(user)}
                        className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 rounded-lg"
                        title="Edit User Record"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteUser(user.id, user.fullName)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        title="Delete User Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold text-slate-700">No members match your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try updating the search parameters or filter selections.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Add Institutional Member</h3>
                <p className="text-xs text-slate-500 mt-0.5">Register an authentic record to the university directory</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 mt-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <Input 
                    required 
                    placeholder="e.g. Aditi Kulkarni"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional / Personal Email</label>
                  <Input 
                    type="email" 
                    required 
                    placeholder="aditi.k@alumni.saarthi.edu.in"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Role</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    <option value="Alumni">Alumni</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Batch</label>
                  <Input 
                    type="number" 
                    required 
                    placeholder="2023"
                    value={newUser.batch}
                    onChange={(e) => setNewUser({ ...newUser, batch: parseInt(e.target.value) || 2024 })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Enrollment ID</label>
                  <Input 
                    required 
                    placeholder="2019BTECCSE102"
                    value={newUser.enrollmentNumber}
                    onChange={(e) => setNewUser({ ...newUser, enrollmentNumber: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select 
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <Input 
                    placeholder="+91 98112 00450"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation / Degree</label>
                  <Input 
                    placeholder="e.g. Lead Systems Architect"
                    value={newUser.designationOrDegree}
                    onChange={(e) => setNewUser({ ...newUser, designationOrDegree: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Campus</label>
                  <Input 
                    placeholder="e.g. Microsoft India"
                    value={newUser.organizationOrCampus}
                    onChange={(e) => setNewUser({ ...newUser, organizationOrCampus: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current City</label>
                  <Input 
                    placeholder="e.g. Bengaluru"
                    value={newUser.city}
                    onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Verification Status</label>
                <select 
                  value={newUser.verificationStatus}
                  onChange={(e) => setNewUser({ ...newUser, verificationStatus: e.target.value as VerificationStatus })}
                  className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                >
                  <option value="Verified">Verified Immediately</option>
                  <option value="Pending">Queue for Document Review</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-brand-deep hover:bg-brand-btn text-white"
                >
                  Save Institutional Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Update Member Record</h3>
                <p className="text-xs text-slate-500 mt-0.5">Editing credentials for {editingUser.fullName}</p>
              </div>
              <button 
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4 mt-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <Input 
                    required 
                    value={editingUser.fullName}
                    onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    required 
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    <option value="Alumni">Alumni</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Batch</label>
                  <Input 
                    type="number" 
                    required 
                    value={editingUser.batch}
                    onChange={(e) => setEditingUser({ ...editingUser, batch: parseInt(e.target.value) || 2024 })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enrollment ID</label>
                  <Input 
                    required 
                    value={editingUser.enrollmentNumber}
                    onChange={(e) => setEditingUser({ ...editingUser, enrollmentNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select 
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Verification Status</label>
                  <select 
                    value={editingUser.verificationStatus}
                    onChange={(e) => setEditingUser({ ...editingUser, verificationStatus: e.target.value as VerificationStatus })}
                    className="w-full h-10 px-3 rounded-md border border-input text-sm bg-white"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                  <Input 
                    value={editingUser.designationOrDegree}
                    onChange={(e) => setEditingUser({ ...editingUser, designationOrDegree: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Campus</label>
                  <Input 
                    value={editingUser.organizationOrCampus}
                    onChange={(e) => setEditingUser({ ...editingUser, organizationOrCampus: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-brand-deep hover:bg-brand-btn text-white"
                >
                  Update Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
