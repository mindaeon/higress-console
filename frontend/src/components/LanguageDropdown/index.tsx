import i18n, { lngs } from '@/i18n';
import React, { useCallback } from 'react';
import styles from './index.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LanguageDropdownProps {}

const LanguageDropdown: React.FC<LanguageDropdownProps> = () => {
  const handleMenuClick = useCallback(() => {
    const currentIndex = lngs.findIndex((l) => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % lngs.length;
    const nextCode = lngs[nextIndex].code;
    i18n.changeLanguage(nextCode);
    localStorage.setItem('i18nextLng', nextCode);
  }, []);

  const currentLanguage = i18n.language;
  const languageConfig = lngs.find((l) => l.code === currentLanguage) || lngs[0];

  return (
    <span className={`${styles['language-switch']}`} onClick={handleMenuClick}>
      {languageConfig?.switchText || currentLanguage}
    </span>
  );
};

export default LanguageDropdown;
