// Saarthi Institutional Administration Data Store
// Backed by persistent browser storage (localStorage) with authentic university data

export type UserRole = 'Student' | 'Alumni' | 'Faculty';
export type VerificationStatus = 'Verified' | 'Pending' | 'Rejected';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  batch: number;
  enrollmentNumber: string;
  verificationStatus: VerificationStatus;
  designationOrDegree: string;
  organizationOrCampus: string;
  city: string;
  registeredDate: string;
}

export type DocumentType = 
  | 'Degree Provisional Certificate'
  | 'Consolidated Mark Sheet'
  | 'Institutional Student ID'
  | 'Alumni Association Membership Card'
  | 'Faculty Appointment Letter';

export interface VerificationRequest {
  id: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  applicantRole: UserRole;
  department: string;
  batch: number;
  enrollmentNumber: string;
  documentType: DocumentType;
  documentReferenceNumber: string;
  submissionDate: string;
  status: VerificationStatus;
  reviewerNotes?: string;
  verifiedAt?: string;
}

export type EventCategory = 
  | 'Alumni Reunion'
  | 'Technical Symposium'
  | 'Career Fair & Placement'
  | 'Industry Leadership Panel'
  | 'Distinguished Alumni Lecture'
  | 'Mentorship Round Table';

export type EventDeliveryMode = 'On-Campus' | 'Virtual' | 'Hybrid';

export interface EventRecord {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  deliveryMode: EventDeliveryMode;
  capacity: number;
  registeredAttendees: number;
  status: 'Scheduled' | 'Completed' | 'Draft';
  description: string;
  organizer: string;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  target: string;
  actor: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Info';
}

const STORAGE_KEY = 'saarthi_institutional_records_v1';

// Initial authentic institutional records
const INITIAL_USERS: UserRecord[] = [
  {
    id: 'USR-2021-042',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@alumni.saarthi.edu.in',
    phone: '+91 98450 11245',
    role: 'Alumni',
    department: 'Computer Science and Engineering',
    batch: 2021,
    enrollmentNumber: '2017BTECCSE042',
    verificationStatus: 'Verified',
    designationOrDegree: 'Senior Platform Engineer',
    organizationOrCampus: 'Infosys Center of AI',
    city: 'Bengaluru',
    registeredDate: '2026-08-12',
  },
  {
    id: 'USR-2019-108',
    fullName: 'Priya Patel',
    email: 'priya.patel@alumni.saarthi.edu.in',
    phone: '+91 97123 44901',
    role: 'Alumni',
    department: 'Management Studies',
    batch: 2019,
    enrollmentNumber: '2017MBAMGT108',
    verificationStatus: 'Verified',
    designationOrDegree: 'Senior Product Manager',
    organizationOrCampus: 'HDFC Digital Banking Group',
    city: 'Mumbai',
    registeredDate: '2026-08-15',
  },
  {
    id: 'USR-2024-315',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@students.saarthi.edu.in',
    phone: '+91 99870 54321',
    role: 'Student',
    department: 'Computer Science and Engineering',
    batch: 2026,
    enrollmentNumber: '2022BTECCSE315',
    verificationStatus: 'Pending',
    designationOrDegree: 'Final Year B.Tech Scholar',
    organizationOrCampus: 'Main Campus',
    city: 'Pune',
    registeredDate: '2026-09-18',
  },
  {
    id: 'USR-2022-094',
    fullName: 'Dr. Rajesh Raman',
    email: 'rajesh.raman@faculty.saarthi.edu.in',
    phone: '+91 94441 87654',
    role: 'Faculty',
    department: 'Electronics and Communication Engineering',
    batch: 2010,
    enrollmentNumber: 'FAC-ECE-094',
    verificationStatus: 'Verified',
    designationOrDegree: 'Professor and Head of Department',
    organizationOrCampus: 'Department of ECE',
    city: 'Chennai',
    registeredDate: '2026-07-01',
  },
  {
    id: 'USR-2020-077',
    fullName: 'Vikramjit Singh',
    email: 'vikram.singh@alumni.saarthi.edu.in',
    phone: '+91 98112 33490',
    role: 'Alumni',
    department: 'Electronics and Communication Engineering',
    batch: 2020,
    enrollmentNumber: '2016BTECECE077',
    verificationStatus: 'Verified',
    designationOrDegree: 'Principal Hardware Architect',
    organizationOrCampus: 'Qualcomm India',
    city: 'New Delhi',
    registeredDate: '2026-08-04',
  },
  {
    id: 'USR-2025-219',
    fullName: 'Ananya Sen',
    email: 'ananya.sen@students.saarthi.edu.in',
    phone: '+91 98301 77623',
    role: 'Student',
    department: 'Mechanical Engineering',
    batch: 2025,
    enrollmentNumber: '2021BTECME219',
    verificationStatus: 'Pending',
    designationOrDegree: 'Senior Undergraduate Researcher',
    organizationOrCampus: 'Main Campus',
    city: 'Kolkata',
    registeredDate: '2026-09-19',
  },
  {
    id: 'USR-2018-053',
    fullName: 'Neha Gupta',
    email: 'neha.gupta@alumni.saarthi.edu.in',
    phone: '+91 98205 66712',
    role: 'Alumni',
    department: 'Computer Science and Engineering',
    batch: 2018,
    enrollmentNumber: '2014BTECCSE053',
    verificationStatus: 'Verified',
    designationOrDegree: 'Associate Director of Engineering',
    organizationOrCampus: 'Tata Consultancy Services Research',
    city: 'Hyderabad',
    registeredDate: '2026-08-10',
  },
  {
    id: 'USR-2026-118',
    fullName: 'Kavita Sundaram',
    email: 'kavita.s@alumni.saarthi.edu.in',
    phone: '+91 94450 88219',
    role: 'Alumni',
    department: 'Civil Engineering',
    batch: 2017,
    enrollmentNumber: '2013BTECCIV118',
    verificationStatus: 'Pending',
    designationOrDegree: 'Project Infrastructure Consultant',
    organizationOrCampus: 'Larsen and Toubro Infrastructure',
    city: 'Ahmedabad',
    registeredDate: '2026-09-20',
  }
];

const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'VR-2026-0901',
    userId: 'USR-2024-315',
    applicantName: 'Rohan Deshmukh',
    applicantEmail: 'rohan.deshmukh@students.saarthi.edu.in',
    applicantRole: 'Student',
    department: 'Computer Science and Engineering',
    batch: 2026,
    enrollmentNumber: '2022BTECCSE315',
    documentType: 'Institutional Student ID',
    documentReferenceNumber: 'SAARTHI-ID-2022-315',
    submissionDate: '2026-09-18',
    status: 'Pending',
  },
  {
    id: 'VR-2026-0902',
    userId: 'USR-2025-219',
    applicantName: 'Ananya Sen',
    applicantEmail: 'ananya.sen@students.saarthi.edu.in',
    applicantRole: 'Student',
    department: 'Mechanical Engineering',
    batch: 2025,
    enrollmentNumber: '2021BTECME219',
    documentType: 'Consolidated Mark Sheet',
    documentReferenceNumber: 'AU-EXAM-SEM6-219',
    submissionDate: '2026-09-19',
    status: 'Pending',
  },
  {
    id: 'VR-2026-0903',
    userId: 'USR-2026-118',
    applicantName: 'Kavita Sundaram',
    applicantEmail: 'kavita.s@alumni.saarthi.edu.in',
    applicantRole: 'Alumni',
    department: 'Civil Engineering',
    batch: 2017,
    enrollmentNumber: '2013BTECCIV118',
    documentType: 'Degree Provisional Certificate',
    documentReferenceNumber: 'DEG-CONV-2017-0881',
    submissionDate: '2026-09-20',
    status: 'Pending',
  },
  {
    id: 'VR-2026-0814',
    userId: 'USR-2021-042',
    applicantName: 'Aarav Sharma',
    applicantEmail: 'aarav.sharma@alumni.saarthi.edu.in',
    applicantRole: 'Alumni',
    department: 'Computer Science and Engineering',
    batch: 2021,
    enrollmentNumber: '2017BTECCSE042',
    documentType: 'Degree Provisional Certificate',
    documentReferenceNumber: 'DEG-CONV-2021-1402',
    submissionDate: '2026-08-12',
    status: 'Approved',
    reviewerNotes: 'Degree certificate verified against the University Academic Registrar records.',
    verifiedAt: '2026-08-13',
  },
  {
    id: 'VR-2026-0819',
    userId: 'USR-2019-108',
    applicantName: 'Priya Patel',
    applicantEmail: 'priya.patel@alumni.saarthi.edu.in',
    applicantRole: 'Alumni',
    department: 'Management Studies',
    batch: 2019,
    enrollmentNumber: '2017MBAMGT108',
    documentType: 'Alumni Association Membership Card',
    documentReferenceNumber: 'ALUM-ASSC-MUM-449',
    submissionDate: '2026-08-15',
    status: 'Approved',
    reviewerNotes: 'Verified via alumni chapter registrar.',
    verifiedAt: '2026-08-16',
  }
];

const INITIAL_EVENTS: EventRecord[] = [
  {
    id: 'EVT-2026-01',
    title: 'Annual Institutional Alumni Reunion 2026',
    category: 'Alumni Reunion',
    date: '2026-10-15',
    time: '10:00 AM - 05:00 PM IST',
    venue: 'Sir M. Visvesvaraya Auditorium, Main Campus',
    deliveryMode: 'On-Campus',
    capacity: 650,
    registeredAttendees: 482,
    status: 'Scheduled',
    description: 'The premier annual gathering of institutional graduates from batches 1975 through 2025, featuring keynote addresses, research showcases, and department networking dinners.',
    organizer: 'Institutional Alumni Relations Cell',
  },
  {
    id: 'EVT-2026-02',
    title: 'Autumn Technical Career Expo and Industry Recruitment Fair',
    category: 'Career Fair & Placement',
    date: '2026-11-02',
    time: '09:00 AM - 06:00 PM IST',
    venue: 'Central Placement Complex & Virtual Portal',
    deliveryMode: 'Hybrid',
    capacity: 1500,
    registeredAttendees: 1240,
    status: 'Scheduled',
    description: 'Bi-annual placement and networking symposium connecting final year students and young alumni with research laboratories and institutional technology partners.',
    organizer: 'Central Training and Placement Directorate',
  },
  {
    id: 'EVT-2026-03',
    title: 'Industry Panel: Artificial Intelligence and Sustainable Systems',
    category: 'Industry Leadership Panel',
    date: '2026-11-20',
    time: '04:00 PM - 06:30 PM IST',
    venue: 'Executive Seminar Hall 2 and Webcast',
    deliveryMode: 'Hybrid',
    capacity: 300,
    registeredAttendees: 218,
    status: 'Scheduled',
    description: 'Distinguished panel discussion featuring alumni technology leaders analyzing practical applications of machine learning in green energy grid infrastructure.',
    organizer: 'Department of Computer Science & ECE',
  },
  {
    id: 'EVT-2026-04',
    title: 'Dean’s Mentorship Round Table for Women in Engineering',
    category: 'Mentorship Round Table',
    date: '2026-12-05',
    time: '02:30 PM - 05:00 PM IST',
    venue: 'Conference Hall A, Administration Block',
    deliveryMode: 'On-Campus',
    capacity: 120,
    registeredAttendees: 96,
    status: 'Scheduled',
    description: 'Structured one-to-one and small group mentorship forum bridging senior women alumni executives with women undergraduate researchers.',
    organizer: 'Office of Student Welfare & Mentorship Cell',
  }
];

const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'LOG-1092',
    action: 'Verified Alumni Registration',
    target: 'Aarav Sharma (2017BTECCSE042)',
    actor: 'Admin Directorate',
    timestamp: '2026-08-13 11:24 IST',
    status: 'Success',
  },
  {
    id: 'LOG-1093',
    action: 'Approved Institutional Credential',
    target: 'Priya Patel (2017MBAMGT108)',
    actor: 'Admin Directorate',
    timestamp: '2026-08-16 14:50 IST',
    status: 'Success',
  },
  {
    id: 'LOG-1094',
    action: 'Published Institutional Event',
    target: 'Annual Institutional Alumni Reunion 2026',
    actor: 'Events Secretariat',
    timestamp: '2026-09-01 09:15 IST',
    status: 'Info',
  },
  {
    id: 'LOG-1095',
    action: 'Queued Student Verification',
    target: 'Rohan Deshmukh (2022BTECCSE315)',
    actor: 'System Verification Bot',
    timestamp: '2026-09-18 16:30 IST',
    status: 'Info',
  },
  {
    id: 'LOG-1096',
    action: 'Queued Student Verification',
    target: 'Ananya Sen (2021BTECME219)',
    actor: 'System Verification Bot',
    timestamp: '2026-09-19 12:10 IST',
    status: 'Info',
  },
  {
    id: 'LOG-1097',
    action: 'Queued Alumni Verification',
    target: 'Kavita Sundaram (2013BTECCIV118)',
    actor: 'System Verification Bot',
    timestamp: '2026-09-20 18:45 IST',
    status: 'Info',
  }
];

interface StorePayload {
  users: UserRecord[];
  verifications: VerificationRequest[];
  events: EventRecord[];
  auditLogs: AuditLogRecord[];
}

function loadStore(): StorePayload {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: StorePayload = {
        users: INITIAL_USERS,
        verifications: INITIAL_VERIFICATIONS,
        events: INITIAL_EVENTS,
        auditLogs: INITIAL_AUDIT_LOGS,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      users: INITIAL_USERS,
      verifications: INITIAL_VERIFICATIONS,
      events: INITIAL_EVENTS,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
  }
}

function saveStore(data: StorePayload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('saarthi_admin_store_updated'));
  } catch (err) {
    console.error('Failed saving to localStorage', err);
  }
}

export const adminStore = {
  // Subscribers
  subscribe(callback: () => void) {
    window.addEventListener('saarthi_admin_store_updated', callback);
    return () => window.removeEventListener('saarthi_admin_store_updated', callback);
  },

  // Read Operations
  getUsers(): UserRecord[] {
    return loadStore().users;
  },

  getVerifications(): VerificationRequest[] {
    return loadStore().verifications;
  },

  getPendingVerificationsCount(): number {
    return loadStore().verifications.filter((v) => v.status === 'Pending').length;
  },

  getEvents(): EventRecord[] {
    return loadStore().events;
  },

  getAuditLogs(): AuditLogRecord[] {
    return loadStore().auditLogs;
  },

  // User Actions
  addUser(record: Omit<UserRecord, 'id' | 'registeredDate'>): UserRecord {
    const store = loadStore();
    const id = `USR-${record.batch}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString().split('T')[0];
    const newUser: UserRecord = {
      ...record,
      id,
      registeredDate: now,
    };
    store.users.unshift(newUser);

    // If pending, also generate verification queue item
    if (newUser.verificationStatus === 'Pending') {
      const vr: VerificationRequest = {
        id: `VR-${now.replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`,
        userId: newUser.id,
        applicantName: newUser.fullName,
        applicantEmail: newUser.email,
        applicantRole: newUser.role,
        department: newUser.department,
        batch: newUser.batch,
        enrollmentNumber: newUser.enrollmentNumber,
        documentType: newUser.role === 'Student' ? 'Institutional Student ID' : 'Degree Provisional Certificate',
        documentReferenceNumber: `DOC-REF-${newUser.enrollmentNumber}`,
        submissionDate: now,
        status: 'Pending',
      };
      store.verifications.unshift(vr);
    }

    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Registered Institutional User',
      target: `${newUser.fullName} (${newUser.enrollmentNumber})`,
      actor: 'Admin Directorate',
      timestamp: `${now} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Success',
    });

    saveStore(store);
    return newUser;
  },

  updateUser(id: string, updates: Partial<UserRecord>): boolean {
    const store = loadStore();
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) return false;

    store.users[idx] = { ...store.users[idx], ...updates };
    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Updated User Record',
      target: `${store.users[idx].fullName} (${store.users[idx].enrollmentNumber})`,
      actor: 'Admin Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Info',
    });

    saveStore(store);
    return true;
  },

  deleteUser(id: string): boolean {
    const store = loadStore();
    const user = store.users.find((u) => u.id === id);
    if (!user) return false;

    store.users = store.users.filter((u) => u.id !== id);
    store.verifications = store.verifications.filter((v) => v.userId !== id);

    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Deleted User Record',
      target: `${user.fullName} (${user.enrollmentNumber})`,
      actor: 'Admin Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Warning',
    });

    saveStore(store);
    return true;
  },

  // Verification Actions
  approveVerification(id: string, notes?: string): boolean {
    const store = loadStore();
    const req = store.verifications.find((v) => v.id === id);
    if (!req) return false;

    const today = new Date().toISOString().split('T')[0];
    req.status = 'Approved';
    req.verifiedAt = today;
    req.reviewerNotes = notes || 'Credential verified against university records.';

    // Update corresponding user record
    const user = store.users.find((u) => u.id === req.userId || u.enrollmentNumber === req.enrollmentNumber);
    if (user) {
      user.verificationStatus = 'Verified';
    }

    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Approved Institutional Credential',
      target: `${req.applicantName} (${req.enrollmentNumber})`,
      actor: 'Admin Directorate',
      timestamp: `${today} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Success',
    });

    saveStore(store);
    return true;
  },

  rejectVerification(id: string, reason: string): boolean {
    const store = loadStore();
    const req = store.verifications.find((v) => v.id === id);
    if (!req) return false;

    const today = new Date().toISOString().split('T')[0];
    req.status = 'Rejected';
    req.reviewerNotes = reason || 'Documentation mismatch or invalid registration credentials.';

    const user = store.users.find((u) => u.id === req.userId || u.enrollmentNumber === req.enrollmentNumber);
    if (user) {
      user.verificationStatus = 'Rejected';
    }

    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Rejected Credential Submission',
      target: `${req.applicantName} (${req.enrollmentNumber})`,
      actor: 'Admin Directorate',
      timestamp: `${today} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Warning',
    });

    saveStore(store);
    return true;
  },

  batchApprovePending(): number {
    const store = loadStore();
    const today = new Date().toISOString().split('T')[0];
    let approvedCount = 0;

    store.verifications.forEach((req) => {
      if (req.status === 'Pending') {
        req.status = 'Approved';
        req.verifiedAt = today;
        req.reviewerNotes = 'Batch credential approval by Institutional Admin Directorate.';
        approvedCount++;

        const user = store.users.find((u) => u.id === req.userId || u.enrollmentNumber === req.enrollmentNumber);
        if (user) {
          user.verificationStatus = 'Verified';
        }
      }
    });

    if (approvedCount > 0) {
      store.auditLogs.unshift({
        id: `LOG-${Date.now()}`,
        action: 'Batch Credential Approval',
        target: `${approvedCount} Pending Credential Requests Verified`,
        actor: 'Admin Directorate',
        timestamp: `${today} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
        status: 'Success',
      });
      saveStore(store);
    }
    return approvedCount;
  },

  // Event Actions
  addEvent(event: Omit<EventRecord, 'id' | 'registeredAttendees'>): EventRecord {
    const store = loadStore();
    const newEvent: EventRecord = {
      ...event,
      id: `EVT-2026-${Math.floor(10 + Math.random() * 90)}`,
      registeredAttendees: 0,
    };
    store.events.unshift(newEvent);

    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Created Institutional Event',
      target: newEvent.title,
      actor: 'Admin Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Success',
    });

    saveStore(store);
    return newEvent;
  },

  updateEvent(id: string, updates: Partial<EventRecord>): boolean {
    const store = loadStore();
    const idx = store.events.findIndex((e) => e.id === id);
    if (idx === -1) return false;

    store.events[idx] = { ...store.events[idx], ...updates };
    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Updated Event Details',
      target: store.events[idx].title,
      actor: 'Admin Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Info',
    });

    saveStore(store);
    return true;
  },

  deleteEvent(id: string): boolean {
    const store = loadStore();
    const evt = store.events.find((e) => e.id === id);
    if (!evt) return false;

    store.events = store.events.filter((e) => e.id !== id);
    store.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action: 'Deleted Institutional Event',
      target: evt.title,
      actor: 'Admin Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Warning',
    });

    saveStore(store);
    return true;
  },

  // Computed Analytics & Metrics
  getDashboardMetrics() {
    const store = loadStore();
    const totalUsers = store.users.length;
    const verifiedUsers = store.users.filter((u) => u.verificationStatus === 'Verified').length;
    const pendingVerifications = store.verifications.filter((v) => v.status === 'Pending').length;
    const activeEvents = store.events.filter((e) => e.status === 'Scheduled').length;
    const totalAttendees = store.events.reduce((acc, curr) => acc + curr.registeredAttendees, 0);

    const alumniCount = store.users.filter((u) => u.role === 'Alumni').length;
    const studentCount = store.users.filter((u) => u.role === 'Student').length;
    const facultyCount = store.users.filter((u) => u.role === 'Faculty').length;

    // Department Distribution
    const departmentMap: Record<string, number> = {};
    store.users.forEach((u) => {
      departmentMap[u.department] = (departmentMap[u.department] || 0) + 1;
    });

    const departmentList = Object.entries(departmentMap).map(([dept, count]) => ({
      name: dept,
      count,
      percentage: Math.round((count / (totalUsers || 1)) * 100),
    }));

    return {
      totalUsers,
      verifiedUsers,
      pendingVerifications,
      activeEvents,
      totalAttendees,
      alumniCount,
      studentCount,
      facultyCount,
      verificationRate: Math.round((verifiedUsers / (totalUsers || 1)) * 100),
      departmentList,
    };
  },

  // CSV Exporter for Users Directory
  exportUsersCSV() {
    const store = loadStore();
    const headers = [
      'Record ID',
      'Full Name',
      'Email',
      'Phone',
      'Role',
      'Department',
      'Batch',
      'Enrollment Number',
      'Verification Status',
      'Designation / Degree',
      'Organization / Campus',
      'City',
      'Registered Date',
    ];

    const rows = store.users.map((u) => [
      u.id,
      `"${u.fullName}"`,
      u.email,
      `"${u.phone}"`,
      u.role,
      `"${u.department}"`,
      u.batch,
      u.enrollmentNumber,
      u.verificationStatus,
      `"${u.designationOrDegree}"`,
      `"${u.organizationOrCampus}"`,
      `"${u.city}"`,
      u.registeredDate,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `saarthi_institutional_members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
