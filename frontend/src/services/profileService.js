import apiClient from './apiClient';

export async function fetchProfile() {
  const response = await apiClient.get('/profile');
  return response.data;
}
