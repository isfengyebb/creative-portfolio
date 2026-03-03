import apiClient from './apiClient';

export async function fetchResume() {
  const response = await apiClient.get('/resume');
  return response.data;
}
