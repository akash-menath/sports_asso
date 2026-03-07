// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: string;
  updatedAt: string;
}

// Member types
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: 'regular' | 'premium' | 'vip';
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: 'regular' | 'premium' | 'vip';
}

export interface UpdateMemberData extends Partial<CreateMemberData> {
  status?: 'active' | 'inactive' | 'suspended';
}

// Event types
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants?: number;
}

// Attendance types
export interface AttendanceRecord {
  id: number;
  memberId: number;
  eventId: number;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Report types
export interface MemberStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  membershipTypeDistribution: {
    regular: number;
    premium: number;
    vip: number;
  };
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  averageAttendance: number;
}
