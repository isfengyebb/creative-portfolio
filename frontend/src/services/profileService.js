import apiClient from './apiClient';

export async function fetchProfile(lang) {
  const response = await apiClient.get('/profile', {
    params: { lang },
  });
  return response.data;
}
