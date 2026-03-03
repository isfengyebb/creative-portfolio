import { useState, useEffect } from 'react';
import { fetchProfile } from '../services/profileService';
import { transformProfile } from '../models/profileModel';

export function useProfileData() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetchProfile();
        if (!cancelled) {
          setProfile(transformProfile(res.data));
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

  return { profile, loading, error };
}
