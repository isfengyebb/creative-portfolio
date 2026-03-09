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
          if (res && res.data) {
            setProfile(transformProfile(res.data));
          } else {
            // 如果 res.data 为空，也视为一种错误
            throw new Error('Profile data is null or undefined.');
          }
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
