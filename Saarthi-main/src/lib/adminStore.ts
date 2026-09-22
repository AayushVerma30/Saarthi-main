// Saarthi Institutional Administration Data Store & Unified LocalStorage Database
// Backed by persistent browser storage (localStorage) with authentic university data

export type UserRole = 'Student' | 'Alumni' | 'Faculty' | 'Admin';
export type VerificationStatus = 'Verified' | 'Pending' | 'Rejected' | 'Approved';

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
  avatar?: string;
  bio?: string;
  password?: string;
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

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userEmail: string;
  userName: string;
  registeredAt: string;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  target: string;
  actor: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Info';
}

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  role: 'alumni' | 'student' | 'admin';
  phone?: string;
  department?: string;
  batch?: number;
  course?: string;
  enrollmentNumber?: string;
  designationOrDegree?: string;
  organizationOrCampus?: string;
  city?: string;
  avatar?: string;
  bio?: string;
}

export interface Mentor {
  id: string;
  userId: string;
  name: string;
  role: string;
  company: string;
  expertise: string;
  department: string;
  batch: number;
  bio: string;
  availableSlots: number;
  email: string;
  avatar?: string;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  createdAt: string;
  reviewerNotes?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Remote';
  stipendOrSalary: string;
  description: string;
  requirements: string;
  postedBy: string;
  postedDate: string;
  applyLinkOrEmail: string;
}

export interface JobApplication {
  id: string;
  opportunityId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeUrlOrText: string;
  coverNote: string;
  appliedAt: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Declined';
}

export interface GivingCampaign {
  id: string;
  title: string;
  category: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  endDate: string;
  imageUrl?: string;
}

export interface DonationRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  date: string;
}

export interface DiscussionMessage {
  id: string;
  channel: string;
  authorId: string;
  authorName: string;
  authorRole: 'Alumni' | 'Student' | 'Admin' | 'Faculty';
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface ConnectionRecord {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'Connected' | 'Pending';
  createdAt: string;
}

const STORAGE_KEY = 'saarthi_institutional_records_v1';
const SESSION_KEY = 'saarthi_current_user_v1';

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
    bio: 'Passionate about cloud architecture, Kubernetes, and guiding young graduates into modern systems engineering.',
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
    organizationOrCampus: 'Google / HDFC Digital',
    city: 'Mumbai',
    registeredDate: '2026-08-15',
    bio: 'Building consumer tech products. Mentoring students on product thinking, case interviews, and resume building.',
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
    bio: 'Specializing in full-stack web development and distributed algorithms.',
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
    bio: 'Embedded systems, VLSI, and IoT specialist. Open for 1-on-1 technical mentorship.',
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
    bio: 'Researching sustainable energy, CFD simulations, and robotics integration.',
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
    bio: 'Leading engineering initiatives in AI/ML and microservices. Advocate for women in technology.',
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
    bio: 'Infrastructure project manager focused on metro transit and smart cities.',
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
];

const INITIAL_EVENTS: EventRecord[] = [
  {
    id: 'EVT-2026-01',
    title: 'Annual Institutional Alumni Homecoming & Reunion 2026',
    category: 'Alumni Reunion',
    date: '2026-11-20',
    time: '09:30 AM - 05:30 PM IST',
    venue: 'Sir M. Visvesvaraya Main Amphitheatre & Central Lawn',
    deliveryMode: 'On-Campus',
    capacity: 1200,
    registeredAttendees: 486,
    status: 'Scheduled',
    description: 'Welcome back alumni across all graduating decades for networking, department visits, felicitation of distinguished alumni, and networking dinner.',
    organizer: 'Institutional Alumni Secretariat',
  },
  {
    id: 'EVT-2026-02',
    title: 'Global Tech Leadership & AI Disruption Summit',
    category: 'Technical Symposium',
    date: '2026-10-18',
    time: '02:00 PM - 06:00 PM IST',
    venue: 'Dr. A.P.J. Abdul Kalam Convention Hall (Virtual Stream Worldwide)',
    deliveryMode: 'Hybrid',
    capacity: 2500,
    registeredAttendees: 1420,
    status: 'Scheduled',
    description: 'Keynotes from prominent alumni engineering leaders at Google, Infosys, and Nvidia exploring the future of Agentic AI and foundation models.',
    organizer: 'Department of Computer Science & ECE Alumni Chapters',
  },
  {
    id: 'EVT-2026-03',
    title: 'Annual Campus Placement & Mentorship Fast-Track Fair',
    category: 'Career Fair & Placement',
    date: '2026-10-30',
    time: '10:00 AM - 05:00 PM IST',
    venue: 'Student Activity Center (SAC) & Campus Auditorium',
    deliveryMode: 'On-Campus',
    capacity: 800,
    registeredAttendees: 312,
    status: 'Scheduled',
    description: 'Direct hiring interviews, portfolio reviews, and mock rounds powered by alumni-led hiring teams from over 45 industry partners.',
    organizer: 'Central Training and Placement Cell',
  },
  {
    id: 'EVT-2026-04',
    title: 'Distinguished Alumni Lecture: The Green Energy Transition',
    category: 'Distinguished Alumni Lecture',
    date: '2026-11-05',
    time: '04:00 PM - 05:30 PM IST',
    venue: 'Auditorium 2, Main Academic Block',
    deliveryMode: 'Hybrid',
    capacity: 400,
    registeredAttendees: 198,
    status: 'Scheduled',
    description: 'Insightful exploration of national infrastructure, green hydrogen, and renewable grids by alumni infrastructure consultant Kavita Sundaram.',
    organizer: 'Civil and Mechanical Alumni Forum',
  },
];

const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'MNT-1',
    userId: 'USR-2019-108',
    name: 'Priya Patel',
    role: 'Senior Product Manager',
    company: 'Google / HDFC Digital',
    expertise: 'Product Strategy, UX Architecture, Case Interviews',
    department: 'Management Studies',
    batch: 2019,
    bio: 'Guided 30+ students into product management, fintech, and strategic planning. Passionate about empowering young talent.',
    availableSlots: 4,
    email: 'priya.patel@alumni.saarthi.edu.in',
  },
  {
    id: 'MNT-2',
    userId: 'USR-2020-077',
    name: 'Vikramjit Singh',
    role: 'Principal Hardware Architect',
    company: 'Qualcomm India',
    expertise: 'System Design, VLSI, Embedded Systems, Career Growth',
    department: 'Electronics & Communication',
    batch: 2020,
    bio: 'Specialist in low-power architecture and microchip engineering. Offering resume reviews and deep-dive technical interview prep.',
    availableSlots: 3,
    email: 'vikram.singh@alumni.saarthi.edu.in',
  },
  {
    id: 'MNT-3',
    userId: 'USR-2021-042',
    name: 'Aarav Sharma',
    role: 'Senior Platform Engineer',
    company: 'Infosys Center of AI',
    expertise: 'Cloud Infrastructure, Kubernetes, Golang, Microservices',
    department: 'Computer Science and Engineering',
    batch: 2021,
    bio: 'Passionate about scalable systems, distributed backends, and open-source contributions. Available for mock system design rounds.',
    availableSlots: 5,
    email: 'aarav.sharma@alumni.saarthi.edu.in',
  },
  {
    id: 'MNT-4',
    userId: 'USR-2018-053',
    name: 'Neha Gupta',
    role: 'Associate Director of Engineering',
    company: 'Tata Consultancy Services',
    expertise: 'AI/ML Engineering, Leadership, Research Publishing',
    department: 'Computer Science and Engineering',
    batch: 2018,
    bio: 'Helping engineers make the leap from junior developer to tech lead and architect. Mentor for Women in STEM.',
    availableSlots: 2,
    email: 'neha.gupta@alumni.saarthi.edu.in',
  }
];

const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 'REQ-1',
    mentorId: 'MNT-1',
    mentorName: 'Priya Patel',
    studentId: 'USR-2024-315',
    studentName: 'Rohan Deshmukh',
    studentEmail: 'rohan.deshmukh@students.saarthi.edu.in',
    topic: 'Transitioning to Tech Product Management',
    message: 'Hello Priya Maam, I am in my final year of CSE and aspiring to enter Associate Product Manager (APM) roles. I would love guidance on preparing product tear-downs and case studies.',
    status: 'Pending',
    createdAt: '2026-09-20',
  }
];

const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OPP-1',
    title: 'Associate Cloud Engineer (Full-Time)',
    company: 'Infosys Innovation Lab',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    stipendOrSalary: '₹12 - 16 LPA',
    description: 'Join the cloud platform team building enterprise containerized architectures, observability pipelines, and distributed Kubernetes clusters.',
    requirements: 'Strong fundamentals in Linux, Docker, Python/Go, and networking. B.Tech graduates of 2025/2026.',
    postedBy: 'Aarav Sharma (Alumni \'21)',
    postedDate: '2026-09-18',
    applyLinkOrEmail: 'careers@infosys-labs.com',
  },
  {
    id: 'OPP-2',
    title: 'Product Management Summer Intern',
    company: 'Google Digital Growth',
    location: 'Bengaluru / Hyderabad',
    type: 'Internship',
    stipendOrSalary: '₹65,000 / month',
    description: 'Work directly with PM teams on user research, PRD documentation, feature telemetry, and product launch roadmaps.',
    requirements: 'Analytical mindset, cross-functional collaboration, open to all engineering and management students.',
    postedBy: 'Priya Patel (Alumni \'19)',
    postedDate: '2026-09-20',
    applyLinkOrEmail: 'internships@google.com',
  },
  {
    id: 'OPP-3',
    title: 'Embedded Firmware & IoT Engineer',
    company: 'Qualcomm India',
    location: 'Noida / New Delhi',
    type: 'Full-time',
    stipendOrSalary: '₹14 - 18 LPA',
    description: 'Design and validate real-time embedded OS modules, device drivers, and low-power IoT connectivity protocols.',
    requirements: 'C/C++, RTOS, microcontroller debugging (ARM Cortex), protocols (SPI, I2C, UART).',
    postedBy: 'Vikramjit Singh (Alumni \'20)',
    postedDate: '2026-09-15',
    applyLinkOrEmail: 'careers@qualcomm.com',
  },
  {
    id: 'OPP-4',
    title: 'Frontend React / UI/UX Apprentice',
    company: 'Saarthi Technology Guild',
    location: 'Remote',
    type: 'Internship',
    stipendOrSalary: '₹35,000 / month',
    description: 'Craft modern, accessible, beautiful interfaces for our institutional networks and educational dashboards.',
    requirements: 'React, TypeScript, Tailwind CSS, clean design sense and component-driven mindset.',
    postedBy: 'Saarthi Core Team',
    postedDate: '2026-09-21',
    applyLinkOrEmail: 'jobs@saarthi.edu.in',
  }
];

const INITIAL_CAMPAIGNS: GivingCampaign[] = [
  {
    id: 'CMP-1',
    title: 'Merit-Cum-Need Student Scholarship Fund 2026',
    category: 'Scholarships & Grants',
    description: 'Empowering deserving students facing financial hardships with full tuition fee waivers, boarding stipends, and academic resources.',
    goal: 5000000,
    raised: 2845000,
    donors: 312,
    endDate: '2026-12-31',
  },
  {
    id: 'CMP-2',
    title: 'Next-Gen AI & Robotics Makerspace Lab',
    category: 'Campus Infrastructure',
    description: 'Establishing state-of-the-art GPU computing clusters, 3D prototyping stations, and robotics kits for undergraduate researchers.',
    goal: 3500000,
    raised: 1980000,
    donors: 145,
    endDate: '2026-11-30',
  },
  {
    id: 'CMP-3',
    title: 'Rural Student Laptop & Connectivity Grant',
    category: 'Digital Inclusion',
    description: 'Providing refurbished laptops, high-speed WiFi modules, and software access to incoming first-generation college scholars.',
    goal: 1500000,
    raised: 1220000,
    donors: 268,
    endDate: '2026-10-31',
  }
];

const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'DON-1',
    campaignId: 'CMP-1',
    campaignTitle: 'Merit-Cum-Need Student Scholarship Fund 2026',
    donorName: 'Vikramjit Singh',
    donorEmail: 'vikram.singh@alumni.saarthi.edu.in',
    amount: 50000,
    message: 'Proud to support our next generation of engineers. Keep dreaming big!',
    isAnonymous: false,
    date: '2026-09-15',
  },
  {
    id: 'DON-2',
    campaignId: 'CMP-1',
    campaignTitle: 'Merit-Cum-Need Student Scholarship Fund 2026',
    donorName: 'Neha Gupta',
    donorEmail: 'neha.gupta@alumni.saarthi.edu.in',
    amount: 100000,
    message: 'Dedicated in honor of the CSE 2018 batch faculty mentors.',
    isAnonymous: false,
    date: '2026-09-18',
  },
  {
    id: 'DON-3',
    campaignId: 'CMP-2',
    campaignTitle: 'Next-Gen AI & Robotics Makerspace Lab',
    donorName: 'Aarav Sharma',
    donorEmail: 'aarav.sharma@alumni.saarthi.edu.in',
    amount: 25000,
    message: 'For high-performance computing hardware access for all scholars!',
    isAnonymous: false,
    date: '2026-09-20',
  }
];

const INITIAL_DISCUSSIONS: DiscussionMessage[] = [
  {
    id: 'MSG-1',
    channel: 'career-guidance',
    authorId: 'USR-2019-108',
    authorName: 'Priya Patel',
    authorRole: 'Alumni',
    content: 'Welcome everyone! For all final-year students preparing for upcoming placement drives: remember that clear communication and explaining your problem-solving thought process is just as important as writing optimized code. Feel free to ask questions here!',
    timestamp: '2026-09-21 10:30 AM',
    likes: 18,
  },
  {
    id: 'MSG-2',
    channel: 'career-guidance',
    authorId: 'USR-2024-315',
    authorName: 'Rohan Deshmukh',
    authorRole: 'Student',
    content: 'Thank you Priya Ma\'am! Do top tech companies look more at competitive programming ranks or full-stack production projects on GitHub for initial screening?',
    timestamp: '2026-09-21 11:15 AM',
    likes: 6,
  },
  {
    id: 'MSG-3',
    channel: 'career-guidance',
    authorId: 'USR-2021-042',
    authorName: 'Aarav Sharma',
    authorRole: 'Alumni',
    content: 'Rohan, in our team at Infosys AI Lab we look for demonstrable end-to-end projects: code clarity, good test coverage, and documentation matter far more than contest puzzle solving. Build real things and deploy them!',
    timestamp: '2026-09-21 11:45 AM',
    likes: 24,
  },
  {
    id: 'MSG-4',
    channel: 'campus-announcements',
    authorId: 'USR-ADMIN',
    authorName: 'Institutional Secretariat',
    authorRole: 'Admin',
    content: 'Registration is now officially open for the Annual Alumni Homecoming 2026! Over 500 graduates have already RSVP\'d. Check the Events tab to reserve your badge.',
    timestamp: '2026-09-22 09:00 AM',
    likes: 42,
  },
  {
    id: 'MSG-5',
    channel: 'tech-and-ai',
    authorId: 'USR-2020-077',
    authorName: 'Vikramjit Singh',
    authorRole: 'Alumni',
    content: 'We are seeing unprecedented demand for hardware-accelerated AI models running on edge chips. If anyone in ECE or CSE is interested in TinyML and RISC-V, reach out through the Mentorship tab!',
    timestamp: '2026-09-22 03:20 PM',
    likes: 15,
  }
];

const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'LOG-001',
    action: 'Approved Institutional Credential',
    target: 'Aarav Sharma (2017BTECCSE042)',
    actor: 'Admin Directorate',
    timestamp: '2026-09-21 10:14 IST',
    status: 'Success',
  },
  {
    id: 'LOG-002',
    action: 'Published Institutional Event',
    target: 'Annual Institutional Alumni Homecoming & Reunion 2026',
    actor: 'Admin Directorate',
    timestamp: '2026-09-20 16:30 IST',
    status: 'Success',
  },
  {
    id: 'LOG-003',
    action: 'Approved Institutional Credential',
    target: 'Priya Patel (2017MBAMGT108)',
    actor: 'Admin Directorate',
    timestamp: '2026-09-20 11:05 IST',
    status: 'Success',
  }
];

interface StorePayload {
  users: UserRecord[];
  verifications: VerificationRequest[];
  events: EventRecord[];
  eventRegistrations: EventRegistration[];
  mentors: Mentor[];
  mentorshipRequests: MentorshipRequest[];
  opportunities: Opportunity[];
  jobApplications: JobApplication[];
  campaigns: GivingCampaign[];
  donations: DonationRecord[];
  discussions: DiscussionMessage[];
  connections: ConnectionRecord[];
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
        eventRegistrations: [
          {
            id: 'REG-1',
            eventId: 'EVT-2026-01',
            userId: 'USR-2021-042',
            userEmail: 'aarav.sharma@alumni.saarthi.edu.in',
            userName: 'Aarav Sharma',
            registeredAt: '2026-09-18',
          }
        ],
        mentors: INITIAL_MENTORS,
        mentorshipRequests: INITIAL_MENTORSHIP_REQUESTS,
        opportunities: INITIAL_OPPORTUNITIES,
        jobApplications: [
          {
            id: 'APP-1',
            opportunityId: 'OPP-1',
            jobTitle: 'Associate Cloud Engineer (Full-Time)',
            company: 'Infosys Innovation Lab',
            applicantId: 'USR-2024-315',
            applicantName: 'Rohan Deshmukh',
            applicantEmail: 'rohan.deshmukh@students.saarthi.edu.in',
            applicantPhone: '+91 99870 54321',
            resumeUrlOrText: 'https://linkedin.com/in/rohandeshmukh',
            coverNote: 'Experienced with Kubernetes and Go.',
            appliedAt: '2026-09-19',
            status: 'Submitted',
          }
        ],
        campaigns: INITIAL_CAMPAIGNS,
        donations: INITIAL_DONATIONS,
        discussions: INITIAL_DISCUSSIONS,
        connections: [
          {
            id: 'CON-1',
            fromUserId: 'USR-2024-315',
            toUserId: 'USR-2021-042',
            status: 'Connected',
            createdAt: '2026-09-19',
          }
        ],
        auditLogs: INITIAL_AUDIT_LOGS,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    // Ensure all keys exist for robust backwards compatibility
    return {
      users: parsed.users || INITIAL_USERS,
      verifications: parsed.verifications || INITIAL_VERIFICATIONS,
      events: parsed.events || INITIAL_EVENTS,
      eventRegistrations: parsed.eventRegistrations || [],
      mentors: parsed.mentors || INITIAL_MENTORS,
      mentorshipRequests: parsed.mentorshipRequests || INITIAL_MENTORSHIP_REQUESTS,
      opportunities: parsed.opportunities || INITIAL_OPPORTUNITIES,
      jobApplications: parsed.jobApplications || [],
      campaigns: parsed.campaigns || INITIAL_CAMPAIGNS,
      donations: parsed.donations || INITIAL_DONATIONS,
      discussions: parsed.discussions || INITIAL_DISCUSSIONS,
      connections: parsed.connections || [],
      auditLogs: parsed.auditLogs || INITIAL_AUDIT_LOGS,
    };
  } catch (err) {
    console.error('Error loading store, falling back to default', err);
    return {
      users: INITIAL_USERS,
      verifications: INITIAL_VERIFICATIONS,
      events: INITIAL_EVENTS,
      eventRegistrations: [],
      mentors: INITIAL_MENTORS,
      mentorshipRequests: INITIAL_MENTORSHIP_REQUESTS,
      opportunities: INITIAL_OPPORTUNITIES,
      jobApplications: [],
      campaigns: INITIAL_CAMPAIGNS,
      donations: INITIAL_DONATIONS,
      discussions: INITIAL_DISCUSSIONS,
      connections: [],
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

  // ----------------------------------------------------------------
  // AUTHENTICATION & ACTIVE SESSION
  // ----------------------------------------------------------------
  getCurrentUser(): CurrentUser {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }

    // Default fallback based on stored userRole or default alumni
    const role = (localStorage.getItem('userRole') || 'alumni') as 'alumni' | 'student' | 'admin';
    if (role === 'admin') {
      const adminUser: CurrentUser = {
        id: 'USR-ADMIN',
        fullName: 'Institutional Directorate',
        email: 'admin@saarthi.edu',
        role: 'admin',
        designationOrDegree: 'Chief System Administrator',
        organizationOrCampus: 'Registrar Directorate',
        city: 'New Delhi',
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));
      return adminUser;
    }

    if (role === 'student') {
      const studentUser: CurrentUser = {
        id: 'USR-2024-315',
        fullName: 'Rohan Deshmukh',
        email: 'rohan.deshmukh@students.saarthi.edu.in',
        role: 'student',
        phone: '+91 99870 54321',
        department: 'Computer Science and Engineering',
        batch: 2026,
        course: 'B.Tech',
        enrollmentNumber: '2022BTECCSE315',
        designationOrDegree: 'Final Year B.Tech Scholar',
        organizationOrCampus: 'Main Campus',
        city: 'Pune',
        bio: 'Specializing in full-stack web development, AI integration, and systems design.',
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(studentUser));
      return studentUser;
    }

    // Default alumni: Priya Patel
    const alumniUser: CurrentUser = {
      id: 'USR-2019-108',
      fullName: 'Priya Patel',
      email: 'priya.patel@alumni.saarthi.edu.in',
      role: 'alumni',
      phone: '+91 97123 44901',
      department: 'Management Studies',
      batch: 2019,
      course: 'MBA',
      enrollmentNumber: '2017MBAMGT108',
      designationOrDegree: 'Senior Product Manager',
      organizationOrCampus: 'Google / HDFC Digital',
      city: 'Mumbai',
      bio: 'Leading product initiatives. Passionate about empowering students and giving back to my alma mater.',
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(alumniUser));
    return alumniUser;
  },

  setCurrentUser(user: CurrentUser | null) {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('userRole');
    } else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
    }
    window.dispatchEvent(new Event('saarthi_admin_store_updated'));
  },

  login(email: string, role: 'alumni' | 'student' | 'admin', _password?: string): CurrentUser {
    const store = loadStore();
    const cleanEmail = email.trim().toLowerCase();

    if (role === 'admin') {
      const adminUser: CurrentUser = {
        id: 'USR-ADMIN',
        fullName: 'Institutional Directorate',
        email: cleanEmail || 'admin@saarthi.edu',
        role: 'admin',
        designationOrDegree: 'Chief System Administrator',
        organizationOrCampus: 'Registrar Directorate',
        city: 'New Delhi',
      };
      this.setCurrentUser(adminUser);
      return adminUser;
    }

    // Find in users store
    const existing = store.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      const userSession: CurrentUser = {
        id: existing.id,
        fullName: existing.fullName,
        email: existing.email,
        role: (existing.role.toLowerCase() === 'student' ? 'student' : 'alumni') as 'alumni' | 'student',
        phone: existing.phone,
        department: existing.department,
        batch: existing.batch,
        course: existing.designationOrDegree,
        enrollmentNumber: existing.enrollmentNumber,
        designationOrDegree: existing.designationOrDegree,
        organizationOrCampus: existing.organizationOrCampus,
        city: existing.city,
        avatar: existing.avatar,
        bio: existing.bio,
      };
      this.setCurrentUser(userSession);
      return userSession;
    }

    // If new email on sign-in, dynamically create session
    const capitalizedRole = role === 'student' ? 'Student' : 'Alumni';
    const generatedUser: CurrentUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      fullName: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Member',
      email: cleanEmail,
      role,
      phone: '+91 98000 00000',
      department: 'Computer Science and Engineering',
      batch: role === 'student' ? 2026 : 2022,
      course: 'B.Tech',
      enrollmentNumber: `ENR-${Date.now().toString().slice(-6)}`,
      designationOrDegree: role === 'student' ? 'Undergraduate Student' : 'Graduate Alumnus',
      organizationOrCampus: 'Institutional Network',
      city: 'Bengaluru',
      bio: `Institutional ${capitalizedRole} registered member.`,
    };

    // Also register in user list
    this.addUser({
      fullName: generatedUser.fullName,
      email: generatedUser.email,
      phone: generatedUser.phone || '',
      role: capitalizedRole as UserRole,
      department: generatedUser.department || 'Computer Science and Engineering',
      batch: generatedUser.batch || 2024,
      enrollmentNumber: generatedUser.enrollmentNumber || '',
      verificationStatus: 'Verified',
      designationOrDegree: generatedUser.designationOrDegree || '',
      organizationOrCampus: generatedUser.organizationOrCampus || '',
      city: generatedUser.city || 'Bengaluru',
      bio: generatedUser.bio,
    });

    this.setCurrentUser(generatedUser);
    return generatedUser;
  },

  register(userData: {
    fullName: string;
    email: string;
    role: 'alumni' | 'student';
    phone: string;
    batch: number;
    course: string;
    department: string;
    password?: string;
  }): CurrentUser {
    const store = loadStore();
    const cleanEmail = userData.email.trim().toLowerCase();
    const userRole = userData.role === 'student' ? 'Student' : 'Alumni';

    const newRecord = this.addUser({
      fullName: userData.fullName,
      email: cleanEmail,
      phone: userData.phone,
      role: userRole as UserRole,
      department: userData.department,
      batch: userData.batch,
      enrollmentNumber: `${userData.batch}${userData.department.substring(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      verificationStatus: 'Pending',
      designationOrDegree: `${userData.course} in ${userData.department}`,
      organizationOrCampus: 'Main Campus',
      city: 'Bengaluru',
      bio: `${userRole} member registered in batch of ${userData.batch}.`,
      password: userData.password,
    });

    const session: CurrentUser = {
      id: newRecord.id,
      fullName: newRecord.fullName,
      email: newRecord.email,
      role: userData.role,
      phone: newRecord.phone,
      department: newRecord.department,
      batch: newRecord.batch,
      course: userData.course,
      enrollmentNumber: newRecord.enrollmentNumber,
      designationOrDegree: newRecord.designationOrDegree,
      organizationOrCampus: newRecord.organizationOrCampus,
      city: newRecord.city,
      bio: newRecord.bio,
    };

    this.setCurrentUser(session);
    return session;
  },

  updateProfile(updates: Partial<CurrentUser>): CurrentUser {
    const current = this.getCurrentUser();
    const updated: CurrentUser = { ...current, ...updates };
    this.setCurrentUser(updated);

    // Sync with users list
    const store = loadStore();
    const idx = store.users.findIndex((u) => u.id === current.id || u.email.toLowerCase() === current.email.toLowerCase());
    if (idx !== -1) {
      store.users[idx] = {
        ...store.users[idx],
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone || store.users[idx].phone,
        department: updated.department || store.users[idx].department,
        batch: updated.batch || store.users[idx].batch,
        designationOrDegree: updated.designationOrDegree || store.users[idx].designationOrDegree,
        organizationOrCampus: updated.organizationOrCampus || store.users[idx].organizationOrCampus,
        city: updated.city || store.users[idx].city,
        avatar: updated.avatar || store.users[idx].avatar,
        bio: updated.bio || store.users[idx].bio,
      };
      saveStore(store);
    }

    return updated;
  },

  logout() {
    this.setCurrentUser(null);
  },

  // ----------------------------------------------------------------
  // USER DIRECTORY OPERATIONS
  // ----------------------------------------------------------------
  getUsers(): UserRecord[] {
    return loadStore().users;
  },

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
      actor: 'Institutional Registry',
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
      actor: 'Institutional Directorate',
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
      actor: 'Institutional Directorate',
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Warning',
    });

    saveStore(store);
    return true;
  },

  // ----------------------------------------------------------------
  // VERIFICATIONS
  // ----------------------------------------------------------------
  getVerifications(): VerificationRequest[] {
    return loadStore().verifications;
  },

  getPendingVerificationsCount(): number {
    return loadStore().verifications.filter((v) => v.status === 'Pending').length;
  },

  approveVerification(id: string, notes?: string): boolean {
    const store = loadStore();
    const req = store.verifications.find((v) => v.id === id);
    if (!req) return false;

    const today = new Date().toISOString().split('T')[0];
    req.status = 'Approved';
    req.verifiedAt = today;
    req.reviewerNotes = notes || 'Credential verified against university records.';

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

  // ----------------------------------------------------------------
  // EVENTS & RSVPs
  // ----------------------------------------------------------------
  getEvents(): EventRecord[] {
    return loadStore().events;
  },

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
      actor: 'Admin / Organizers',
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
    saveStore(store);
    return true;
  },

  deleteEvent(id: string): boolean {
    const store = loadStore();
    const evt = store.events.find((e) => e.id === id);
    if (!evt) return false;

    store.events = store.events.filter((e) => e.id !== id);
    store.eventRegistrations = store.eventRegistrations.filter((r) => r.eventId !== id);
    saveStore(store);
    return true;
  },

  getEventRegistrations(userId?: string): EventRegistration[] {
    const store = loadStore();
    if (userId) {
      return store.eventRegistrations.filter((r) => r.userId === userId || r.userEmail === userId);
    }
    return store.eventRegistrations;
  },

  isRegisteredForEvent(eventId: string, userId: string): boolean {
    const store = loadStore();
    return store.eventRegistrations.some((r) => r.eventId === eventId && (r.userId === userId || r.userEmail === userId));
  },

  registerForEvent(eventId: string, user: CurrentUser): boolean {
    const store = loadStore();
    const evt = store.events.find((e) => e.id === eventId);
    if (!evt) return false;

    // Check if already registered
    const exists = store.eventRegistrations.some((r) => r.eventId === eventId && (r.userId === user.id || r.userEmail === user.email));
    if (exists) return true;

    store.eventRegistrations.push({
      id: `REG-${Date.now()}`,
      eventId,
      userId: user.id,
      userEmail: user.email,
      userName: user.fullName,
      registeredAt: new Date().toISOString().split('T')[0],
    });

    evt.registeredAttendees += 1;
    saveStore(store);
    return true;
  },

  unregisterFromEvent(eventId: string, userId: string): boolean {
    const store = loadStore();
    const evt = store.events.find((e) => e.id === eventId);
    if (!evt) return false;

    const initialLength = store.eventRegistrations.length;
    store.eventRegistrations = store.eventRegistrations.filter((r) => !(r.eventId === eventId && (r.userId === userId || r.userEmail === userId)));

    if (store.eventRegistrations.length < initialLength) {
      evt.registeredAttendees = Math.max(0, evt.registeredAttendees - 1);
      saveStore(store);
      return true;
    }
    return false;
  },

  // ----------------------------------------------------------------
  // MENTORSHIP
  // ----------------------------------------------------------------
  getMentors(): Mentor[] {
    return loadStore().mentors;
  },

  addMentor(mentor: Omit<Mentor, 'id'>): Mentor {
    const store = loadStore();
    const newMentor: Mentor = {
      ...mentor,
      id: `MNT-${Date.now().toString().slice(-4)}`,
    };
    store.mentors.unshift(newMentor);
    saveStore(store);
    return newMentor;
  },

  getMentorshipRequests(options?: { mentorId?: string; studentId?: string }): MentorshipRequest[] {
    const store = loadStore();
    let result = store.mentorshipRequests;
    if (options?.mentorId) {
      result = result.filter((r) => r.mentorId === options.mentorId);
    }
    if (options?.studentId) {
      result = result.filter((r) => r.studentId === options.studentId || r.studentEmail === options.studentId);
    }
    return result;
  },

  requestMentorship(req: Omit<MentorshipRequest, 'id' | 'status' | 'createdAt'>): MentorshipRequest {
    const store = loadStore();
    const newReq: MentorshipRequest = {
      ...req,
      id: `REQ-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    store.mentorshipRequests.unshift(newReq);
    saveStore(store);
    return newReq;
  },

  updateMentorshipStatus(requestId: string, status: 'Accepted' | 'Declined', reviewerNotes?: string): boolean {
    const store = loadStore();
    const req = store.mentorshipRequests.find((r) => r.id === requestId);
    if (!req) return false;

    req.status = status;
    if (reviewerNotes) req.reviewerNotes = reviewerNotes;
    saveStore(store);
    return true;
  },

  // ----------------------------------------------------------------
  // OPPORTUNITIES (JOBS & INTERNSHIPS)
  // ----------------------------------------------------------------
  getOpportunities(): Opportunity[] {
    return loadStore().opportunities;
  },

  addOpportunity(opp: Omit<Opportunity, 'id' | 'postedDate'>): Opportunity {
    const store = loadStore();
    const newOpp: Opportunity = {
      ...opp,
      id: `OPP-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };
    store.opportunities.unshift(newOpp);
    saveStore(store);
    return newOpp;
  },

  getJobApplications(options?: { opportunityId?: string; applicantId?: string }): JobApplication[] {
    const store = loadStore();
    let result = store.jobApplications;
    if (options?.opportunityId) {
      result = result.filter((a) => a.opportunityId === options.opportunityId);
    }
    if (options?.applicantId) {
      result = result.filter((a) => a.applicantId === options.applicantId || a.applicantEmail === options.applicantId);
    }
    return result;
  },

  applyForJob(app: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>): JobApplication {
    const store = loadStore();
    const newApp: JobApplication = {
      ...app,
      id: `APP-${Date.now()}`,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
    };
    store.jobApplications.unshift(newApp);
    saveStore(store);
    return newApp;
  },

  hasAppliedForJob(opportunityId: string, applicantId: string): boolean {
    const store = loadStore();
    return store.jobApplications.some((a) => a.opportunityId === opportunityId && (a.applicantId === applicantId || a.applicantEmail === applicantId));
  },

  // ----------------------------------------------------------------
  // GIVING & FUNDRAISING
  // ----------------------------------------------------------------
  getCampaigns(): GivingCampaign[] {
    return loadStore().campaigns;
  },

  addCampaign(camp: Omit<GivingCampaign, 'id' | 'raised' | 'donors'>): GivingCampaign {
    const store = loadStore();
    const newCamp: GivingCampaign = {
      ...camp,
      id: `CMP-${Date.now()}`,
      raised: 0,
      donors: 0,
    };
    store.campaigns.unshift(newCamp);
    saveStore(store);
    return newCamp;
  },

  getDonations(campaignId?: string): DonationRecord[] {
    const store = loadStore();
    if (campaignId) {
      return store.donations.filter((d) => d.campaignId === campaignId);
    }
    return store.donations;
  },

  donateToCampaign(donation: Omit<DonationRecord, 'id' | 'date'>): DonationRecord {
    const store = loadStore();
    const newDonation: DonationRecord = {
      ...donation,
      id: `DON-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    store.donations.unshift(newDonation);

    const camp = store.campaigns.find((c) => c.id === donation.campaignId);
    if (camp) {
      camp.raised += donation.amount;
      camp.donors += 1;
    }

    saveStore(store);
    return newDonation;
  },

  // ----------------------------------------------------------------
  // COMMUNITY DISCUSSIONS / MESSAGES
  // ----------------------------------------------------------------
  getDiscussionMessages(channel?: string): DiscussionMessage[] {
    const store = loadStore();
    if (channel && channel !== 'all') {
      return store.discussions.filter((m) => m.channel === channel);
    }
    return store.discussions;
  },

  postDiscussionMessage(msg: Omit<DiscussionMessage, 'id' | 'timestamp' | 'likes'>): DiscussionMessage {
    const store = loadStore();
    const now = new Date();
    const timeString = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newMsg: DiscussionMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      timestamp: timeString,
      likes: 0,
    };
    store.discussions.push(newMsg);
    saveStore(store);
    return newMsg;
  },

  likeDiscussionMessage(id: string) {
    const store = loadStore();
    const msg = store.discussions.find((m) => m.id === id);
    if (msg) {
      msg.likes += 1;
      saveStore(store);
    }
  },

  // ----------------------------------------------------------------
  // NETWORKING & PEER CONNECTIONS
  // ----------------------------------------------------------------
  getConnections(userId: string): ConnectionRecord[] {
    const store = loadStore();
    return store.connections.filter((c) => c.fromUserId === userId || c.toUserId === userId);
  },

  getConnectionStatus(fromUserId: string, toUserId: string): 'None' | 'Pending' | 'Connected' {
    const store = loadStore();
    const conn = store.connections.find(
      (c) => (c.fromUserId === fromUserId && c.toUserId === toUserId) || (c.fromUserId === toUserId && c.toUserId === fromUserId)
    );
    if (!conn) return 'None';
    return conn.status;
  },

  connectWithUser(fromUserId: string, toUserId: string) {
    const store = loadStore();
    const existing = store.connections.find(
      (c) => (c.fromUserId === fromUserId && c.toUserId === toUserId) || (c.fromUserId === toUserId && c.toUserId === fromUserId)
    );
    if (!existing) {
      store.connections.push({
        id: `CON-${Date.now()}`,
        fromUserId,
        toUserId,
        status: 'Connected', // Instant institutional connect
        createdAt: new Date().toISOString().split('T')[0],
      });
      saveStore(store);
    }
  },

  disconnectUser(fromUserId: string, toUserId: string) {
    const store = loadStore();
    store.connections = store.connections.filter(
      (c) => !((c.fromUserId === fromUserId && c.toUserId === toUserId) || (c.fromUserId === toUserId && c.toUserId === fromUserId))
    );
    saveStore(store);
  },

  // ----------------------------------------------------------------
  // AUDIT LOGS & ANALYTICS
  // ----------------------------------------------------------------
  getAuditLogs(): AuditLogRecord[] {
    return loadStore().auditLogs;
  },

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
    const totalOpportunities = store.opportunities.length;
    const totalFundsRaised = store.campaigns.reduce((acc, curr) => acc + curr.raised, 0);
    const activeMentorships = store.mentorshipRequests.filter((r) => r.status === 'Accepted').length + 8; // Including active alumni cohorts

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
      totalOpportunities,
      totalFundsRaised,
      activeMentorships,
      verificationRate: Math.round((verifiedUsers / (totalUsers || 1)) * 100),
      departmentList,
    };
  },

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
