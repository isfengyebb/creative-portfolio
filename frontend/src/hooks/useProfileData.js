import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchProfile } from '../services/profileService';
import { transformProfile } from '../models/profileModel';

export function useProfileData() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('zh') ? 'zh' : 'en';

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const res = await fetchProfile(lang);
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
  }, [lang]);

  return { profile, loading, error };
}
