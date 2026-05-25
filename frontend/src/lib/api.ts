import axios from 'axios';

// MOCK DATA - Replicating Backend for purely Frontend Demo
const MOCK_USER = {
  id: 1,
  email: 'test@example.com',
  password: '123456',
  name: 'Aaditya',
  trustScore: 92,
  lastVerified: '2 days ago',
  sharedCount: 4
};

const MOCK_CREDENTIALS = [
  { 
    id: 1, title: 'Bachelor of Engineering', issuer: 'VIT University', type: 'Education', 
    status: 'Verified', expiry: 'No Expiry', icon: '🎓', color: 'bg-[#F3F0FF]'
  },
  { 
    id: 2, title: 'Internship Certificate', issuer: 'Tata Consultancy Services', type: 'Employment', 
    status: 'Verified', expiry: 'No Expiry', icon: '💼', color: 'bg-[#E7F5FF]'
  },
  { 
    id: 3, title: 'Passport', issuer: 'Government of India', type: 'Identity', 
    status: 'Verified', expiry: 'Mar 2030', icon: '🛂', color: 'bg-[#FFF9DB]'
  },
  { 
    id: 4, title: 'Aadhaar Card', issuer: 'UIDAI', type: 'Identity', 
    status: 'Verified', expiry: 'Permanent', icon: '🆔', color: 'bg-[#EBFAEA]'
  },
  { 
    id: 5, title: 'Salary Slip July', issuer: 'Startup XYZ', type: 'Finance', 
    status: 'Verified', expiry: 'Past Month', icon: '💰', color: 'bg-[#E7F5FF]'
  },
  { 
    id: 6, title: 'PAN Card', issuer: 'Income Tax Dept', type: 'Finance', 
    status: 'Verified', expiry: 'Permanent', icon: '💳', color: 'bg-[#F3F0FF]'
  },
  { 
    id: 7, title: 'Annual Health Checkup', issuer: 'Apollo Hospital', type: 'Health', 
    status: 'Verified', expiry: 'Jan 2024', icon: '❤️', color: 'bg-[#FFF5F5]'
  },
  { 
    id: 8, title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', type: 'Education', 
    status: 'Verified', expiry: 'Dec 2027', icon: '☁️', color: 'bg-[#F3F0FF]'
  },
  { 
    id: 9, title: 'Full Stack Eng', issuer: 'Startup XYZ', type: 'Employment', 
    status: 'Pending', expiry: '', icon: '💻', color: 'bg-[#F3F0FF]', isClock: true
  },
];

const MOCK_ACTIVITIES = [
  { id: 1, title: 'Bachelor of Engineering', subtitle: 'VIT University · Aug 2020', bgColor: 'bg-[#EBFAEA]', icon: '🎓', status: 'Verified' },
  { id: 2, title: 'Internship Certificate', subtitle: 'Tata Consultancy Services · Jan 2022', bgColor: 'bg-[#E7F5FF]', icon: '💼', status: 'Verified' },
  { id: 3, title: 'Passport', subtitle: 'Government of India · Mar 2020', bgColor: 'bg-[#EBFAEA]', icon: '🛂', status: 'Verified' }
];

// Mock API Client to satisfy existing imports
const apiMock: any = {
  get: async (url: string, config?: any) => {
    console.log(`[MOCK API] GET: ${url}`);
    
    // Simulate slight delay for loading state feel
    await new Promise(resolve => setTimeout(resolve, 300));

    if (url.includes('/dashboard-data')) {
      return { data: MOCK_USER };
    }
    if (url.includes('/activities')) {
      return { data: MOCK_ACTIVITIES };
    }
    if (url.includes('/credentials')) {
        // Simple manual param parsing for robustness
        const type = config?.params?.type;
        if (type && type !== 'All') {
            return { data: MOCK_CREDENTIALS.filter(c => c.type === type) };
        }
        return { data: MOCK_CREDENTIALS };
    }
    
    return { data: {} };
  },
  
  post: async (url: string, data: any, config?: any) => {
    console.log(`[MOCK API] POST: ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/login')) {
      if (data.email === 'test@example.com' && data.password === '123456') {
        return { data: { success: true, user: MOCK_USER, token: 'mock_token' } };
      } else {
        throw { response: { data: { message: 'Invalid credentials' } } };
      }
    }
    
    return { data: { success: true } };
  },
  
  put: async (url: string, data: any) => ({ data: { success: true } }),
  delete: async (url: string) => ({ data: { success: true } }),
  
  // Necessary for some axios feature checks
  defaults: {
    headers: {
        common: {}
    }
  },
  interceptors: {
    request: { use: () => {}, eject: () => {} },
    response: { use: () => {}, eject: () => {} }
  }
};

export default apiMock;
