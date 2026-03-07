import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../lib/api/types';

const AUTH_QUERY_KEY = 'auth';

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => 
      apiClient.post<AuthResponse>('/auth/login', credentials),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      
      // Update React Query cache
      queryClient.setQueryData([AUTH_QUERY_KEY], data.user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Clear any existing token
      localStorage.removeItem('auth_token');
    },
  });
};

// Register mutation
export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: (userData) => 
      apiClient.post<AuthResponse>('/auth/register', userData),
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation<void, Error, { email: string }>({
    mutationFn: ({ email }) => 
      apiClient.post<void>('/auth/forgot-password', { email }),
    onError: (error) => {
      console.error('Forgot password failed:', error);
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation<void, Error, { token: string; password: string }>({
    mutationFn: ({ token, password }) => 
      apiClient.post<void>('/auth/reset-password', { token, password }),
    onError: (error) => {
      console.error('Reset password failed:', error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => 
      apiClient.post<void>('/auth/logout'),
    onSuccess: () => {
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
      
      // Clear React Query cache
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear local data even if API call fails
      localStorage.removeItem('auth_token');
      queryClient.clear();
    },
  });
};

// Get current user query
export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: [AUTH_QUERY_KEY],
    queryFn: () => apiClient.get<User>('/auth/me'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

// Check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: user, isLoading, error } = useCurrentUser();
  
  return {
    isAuthenticated: !!user && !error,
    isLoading,
    user,
  };
};
