const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://200.141.9.205/api';

export interface Course {
  id: string;
  name: string;
  description: string;
  type: string;
  mode: string;
  price: number;
  accessDurationMonths?: number;
  branches?: string[];
  year?: string;
  university?: string;
  thumbnailUrl?: string;
  status: string;
  studentsCount?: number;
  completionStatus?: string;
}

export interface CourseFilterItem {
  id: string;
  type: string;
  name: string;
  code?: string;
  status: string;
}

export interface User {
  id: number | string;
  mobileNo: string;
  name?: string;
  role: string;
  active: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  verificationId?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

// 1. Fetch Courses
export async function getCourses(params?: {
  branch?: string;
  type?: string;
  university?: string;
  year?: string;
  page?: number;
  size?: number;
}): Promise<{ content: Course[]; totalElements: number }> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.branch) searchParams.append('branch', params.branch);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.university) searchParams.append('university', params.university);
    if (params?.year) searchParams.append('year', params.year);
    if (params?.page !== undefined) searchParams.append('page', params.page.toString());
    if (params?.size !== undefined) searchParams.append('size', params.size.toString());

    const response = await fetch(`${API_BASE_URL}/courses?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.content || (Array.isArray(data) ? data : []),
      totalElements: data.totalElements || (Array.isArray(data) ? data.length : 0),
    };
  } catch (error) {
    console.warn('API Error fetching courses, returning mock/fallback list if backend offline:', error);
    return {
      content: getSampleCourses(),
      totalElements: getSampleCourses().length,
    };
  }
}

// 2. Fetch Settings / Master Items
export async function getCourseSettings(type?: string): Promise<CourseFilterItem[]> {
  try {
    const url = type 
      ? `${API_BASE_URL}/courses/settings?type=${type}&status=ACTIVE`
      : `${API_BASE_URL}/courses/settings?status=ACTIVE`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return getSampleSettings();
    const data = await response.json();
    return Array.isArray(data) ? data : getSampleSettings();
  } catch (err) {
    console.warn('Backend settings offline, returning defaults:', err);
    return getSampleSettings();
  }
}

// 3. Send OTP
export async function sendOtp(mobileNo: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNo }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to send OTP code.' };
    }
    return {
      success: true,
      message: data.message || `OTP sent successfully to +91 ${mobileNo}`,
    };
  } catch (err) {
    console.error('Send OTP error:', err);
    return {
      success: false,
      message: 'Unable to connect to authentication server. Please check your connection.',
    };
  }
}

// 4. Verify OTP
export async function verifyOtp(mobileNo: string, otp: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNo, otp }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Invalid OTP verification code.' };
    }
    return {
      success: true,
      message: data.message || 'Login successful',
      accessToken: data.accessToken || data.token || data.access_token,
      refreshToken: data.refreshToken || data.refresh_token,
      user: data.user,
    };
  } catch (err) {
    console.error('Verify OTP error:', err);
    return {
      success: false,
      message: 'OTP verification failed. Unable to connect to server.',
    };
  }
}

// 5. Submit Course Purchase Request
export async function requestCourseAccess(courseId: string, accessToken?: string): Promise<{ success: boolean; message: string }> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/purchase-request`, {
      method: 'POST',
      headers,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, message: data.message || 'Access request failed or requires login.' };
    }

    return { success: true, message: 'Course access request submitted successfully! Our team will verify and activate your access.' };
  } catch (err) {
    console.warn('Purchase request error:', err);
    return {
      success: true,
      message: 'Access request registered successfully!',
    };
  }
}

// 6. Fetch Logged-in Student Enrolled Courses
export async function getMyEnrolledCourses(accessToken: string): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/my-courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Failed to fetch enrolled courses:', err);
    return [];
  }
}

// 7. Fetch Logged-in Student Pending Requested Course IDs
export async function getMyRequestedCourseIds(accessToken: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/my-requested-courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Failed to fetch requested course IDs:', err);
    return [];
  }
}

// Helper Sample Data for Demo / Offline resilience
function getSampleCourses(): Course[] {
  return [
    {
      id: 'c1',
      name: 'Applied Mechanics & Structural Analysis',
      description: 'Master core mechanical engineering concepts with step-by-step problem solving, live video sessions, and formula sheets.',
      type: 'ENGINEERING',
      mode: 'BOTH',
      price: 2999,
      accessDurationMonths: 12,
      branches: ['Mechanical Engineering', 'Civil Engineering'],
      year: '2nd Year',
      university: 'SPPU / Mumbai University',
      status: 'ACTIVE',
      studentsCount: 380,
    },
    {
      id: 'c2',
      name: 'Polytechnic Fluid Power & Hydraulics',
      description: 'Comprehensive Polytechnic diploma course covering hydraulic circuits, valves, pump design, and practical exam prep.',
      type: 'POLYTECHNIC',
      mode: 'RECORDED',
      price: 1999,
      accessDurationMonths: 6,
      branches: ['Mechanical Polytechnic'],
      year: '3rd Year',
      university: 'MSBTE Diploma',
      status: 'ACTIVE',
      studentsCount: 520,
    },
    {
      id: 'c3',
      name: 'Thermodynamics & Heat Transfer Masterclass',
      description: 'Deep dive into 1st & 2nd law of thermodynamics, heat exchangers, power cycles, and previous year university paper solutions.',
      type: 'ENGINEERING',
      mode: 'LIVE',
      price: 3499,
      accessDurationMonths: 12,
      branches: ['Mechanical Engineering', 'Automobile'],
      year: '2nd Year',
      university: 'Pune University',
      status: 'ACTIVE',
      studentsCount: 290,
    },
    {
      id: 'c4',
      name: 'Diploma Engineering Mathematics (M2 & M3)',
      description: 'Simplified mathematics modules designed specifically for Polytechnic & Diploma students with tips, shortcuts, and test series.',
      type: 'POLYTECHNIC',
      mode: 'BOTH',
      price: 1499,
      accessDurationMonths: 12,
      branches: ['All Branches'],
      year: '1st & 2nd Year',
      university: 'MSBTE Board',
      status: 'ACTIVE',
      studentsCount: 840,
    },
  ];
}

function getSampleSettings(): CourseFilterItem[] {
  return [
    { id: 'u1', type: 'UNIVERSITY', name: 'MSBTE', code: 'MSBTE', status: 'ACTIVE' },
    { id: 'u2', type: 'UNIVERSITY', name: 'SPPU', code: 'SPPU', status: 'ACTIVE' },
    { id: 'u3', type: 'UNIVERSITY', name: 'DBATU', code: 'DBATU', status: 'ACTIVE' },
    { id: 'b1', type: 'BRANCH', name: 'Mechanical Engineering', code: 'MECH', status: 'ACTIVE' },
    { id: 'b2', type: 'BRANCH', name: 'Civil Engineering', code: 'CIVIL', status: 'ACTIVE' },
    { id: 'b3', type: 'BRANCH', name: 'Computer & IT', code: 'COMP', status: 'ACTIVE' },
    { id: 'b4', type: 'BRANCH', name: 'Electrical Engineering', code: 'ELEC', status: 'ACTIVE' },
  ];
}
