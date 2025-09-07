import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zhCN } from '../locales/zh-CN';
import { enUS } from '../locales/en-US';
import { StorageManager } from '../utils/storage';

type Language = 'zh-CN' | 'en-US';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 获取嵌套对象的属性值
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const settings = StorageManager.getSettings();
    return settings.language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const settings = StorageManager.getSettings();
    StorageManager.saveSettings({ ...settings, language: lang });
  };

  const t = (key: string): string => {
    const translation = translations[language];
    const value = getNestedValue(translation, key);
    return typeof value === 'string' ? value : key;
  };

  // 当语言设置改变时，更新存储
  useEffect(() => {
    const settings = StorageManager.getSettings();
    if (settings.language !== language) {
      StorageManager.saveSettings({ ...settings, language });
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 