import apiClient from './apiClient';

export async function fetchProjects() {
  const response = await apiClient.get('/projects');
  return response.data;
}

export async function fetchProjectById(id) {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
}
