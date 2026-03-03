import { useState, useEffect } from 'react';
import { fetchResume } from '../services/resumeService';
import { transformResume } from '../models/resumeModel';

export function useResumeData() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetchResume();
        if (!cancelled) {
          setResume(transformResume(res.data));
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

  return { resume, loading, error };
}
