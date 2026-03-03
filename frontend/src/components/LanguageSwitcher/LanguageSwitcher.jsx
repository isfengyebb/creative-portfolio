import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  const toggleLanguage = () => {
    i18n.changeLanguage(isZh ? 'en' : 'zh');
  };

  return (
    <button
      className={styles.switcher}
      onClick={toggleLanguage}
      aria-label={isZh ? 'Switch to English' : '切换为中文'}
    >
      {isZh ? 'EN' : '中'}
    </button>
  );
}

export default LanguageSwitcher;
