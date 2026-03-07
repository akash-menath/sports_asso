import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import type { Member, CreateMemberData, UpdateMemberData, PaginatedResponse } from '../lib/api/types';

const MEMBERS_QUERY_KEY = 'members';

// Get all members
export const useMembers = (page = 1, limit = 10, search = '') => {
  return useQuery<PaginatedResponse<Member>, Error>({
    queryKey: [MEMBERS_QUERY_KEY, page, limit, search],
    queryFn: () => 
      apiClient.get<PaginatedResponse<Member>>(
        `/members?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      ),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get single member
export const useMember = (id: number) => {
  return useQuery<Member, Error>({
    queryKey: [MEMBERS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Member>(`/members/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create member mutation
export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation<Member, Error, CreateMemberData>({
    mutationFn: (memberData) => 
      apiClient.post<Member>('/members', memberData),
    onSuccess: () => {
      // Invalidate members list to refetch
      queryClient.invalidateQueries({ queryKey: [MEMBERS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('Failed to create member:', error);
    },
  });
};

// Update member mutation
export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation<Member, Error, { id: number; data: UpdateMemberData }>({
    mutationFn: ({ id, data }) => 
      apiClient.put<Member>(`/members/${id}`, data),
    onSuccess: (updatedMember, { id }) => {
      // Update the specific member in cache
      queryClient.setQueryData([MEMBERS_QUERY_KEY, id], updatedMember);
      
      // Invalidate members list to refetch
      queryClient.invalidateQueries({ queryKey: [MEMBERS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('Failed to update member:', error);
    },
  });
};

// Delete member mutation
export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => 
      apiClient.delete<void>(`/members/${id}`),
    onSuccess: (_, id) => {
      // Remove the member from cache
      queryClient.removeQueries({ queryKey: [MEMBERS_QUERY_KEY, id] });
      
      // Invalidate members list to refetch
      queryClient.invalidateQueries({ queryKey: [MEMBERS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('Failed to delete member:', error);
    },
  });
};
