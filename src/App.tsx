import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GoalDetailPage from './pages/GoalDetailPage';
import SettingsPage from './pages/SettingsPage';
import { StorageManager } from './utils/storage';
import { UserSettings } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [settings, setSettings] = useState<UserSettings>(() => StorageManager.getSettings());

  useEffect(() => {
    // 应用主题设置
    const root = document.documentElement;
    
    if (settings.theme === 'auto') {
      // 跟随系统设置
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
      
      // 初始设置
      if (mediaQuery.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // 监听系统主题变化
      mediaQuery.addEventListener('change', handleChange);
      
      // 清理监听器
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    StorageManager.saveSettings(newSettings);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header settings={settings} onSettingsChange={updateSettings} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goal/:id" element={<GoalDetailPage />} />
            <Route path="/settings" element={<SettingsPage settings={settings} onSettingsChange={updateSettings} />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App; 