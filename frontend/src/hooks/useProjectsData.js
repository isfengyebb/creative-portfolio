import { useState, useEffect } from 'react';
import { fetchProjects } from '../services/projectService';
import { transformProjects } from '../models/projectModel';

export function useProjectsData() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetchProjects();
        if (!cancelled) {
          setProjects(transformProjects(res.data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}
