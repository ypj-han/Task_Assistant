import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Sun, Moon, Brain } from 'lucide-react';
import { UserSettings } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

const Header: React.FC<HeaderProps> = ({ settings, onSettingsChange }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    onSettingsChange({ ...settings, theme: newTheme });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">{t('nav.taskDecompositionAssistant')}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/settings"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/settings'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {t('nav.settings')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="切换主题"
            >
              {settings.theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link
              to="/settings"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors md:hidden"
              aria-label="设置"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 