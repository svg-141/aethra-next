export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  reputation: number;
  joinDate: Date;
  lastActive: Date;
  badges: string[];
  preferences: UserPreferences;
  isActive: boolean;
  isVerified: boolean;
  role: UserRole;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    showEmail: boolean;
    showLevel: boolean;
    showActivity: boolean;
  };
  theme: string;
  language: string;
}

export type UserRole = 'user' | 'moderator' | 'admin';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  displayName: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

export interface UserPermissions {
  canEdit: (resourceOwnerId: string) => boolean;
  canDelete: (resourceOwnerId: string) => boolean;
  canModerate: () => boolean;
  canAdmin: () => boolean;
}