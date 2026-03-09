import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  const toggleLanguage = () => {
    i18n.changeLanguage(isZh ? 'en' : 'zh');
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'h-9 rounded-md px-3',
        className
      )}
      onClick={toggleLanguage}
      aria-label={isZh ? 'Switch to English' : '切换为中文'}
    >
      {isZh ? 'EN' : '中'}
    </button>
  );
}

export default LanguageSwitcher;
