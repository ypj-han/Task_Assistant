import React, { useState } from 'react';
import { ArrowLeft, Bell, BellOff, Save, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserSettings } from '../types';
import { StorageManager } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface SettingsPageProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSettingsChange }) => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    
    // 如果是语言设置，立即应用
    if (key === 'language') {
      setLanguage(value);
    }
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setHasChanges(false);
    toast.success(t('settings.settingsSaved'));
  };

  const handleClearData = () => {
    if (window.confirm(t('confirm.clearAllData'))) {
      StorageManager.clearAllData();
      toast.success(t('settings.dataManagement.dataCleared'));
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.back')}</span>
        </button>

        {hasChanges && (
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{t('settings.saveSettings')}</span>
          </button>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('settings.title')}
      </h1>

      <div className="space-y-6">
        {/* 通知设置 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.notifications.title')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {localSettings.notifications ? (
                  <Bell className="w-5 h-5 text-green-600" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    {t('settings.notifications.enableNotifications')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('settings.notifications.enableNotificationsDesc')}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {localSettings.notifications && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t('settings.notifications.reminderInterval')}
                </label>
                <select
                  value={localSettings.reminderInterval}
                  onChange={(e) => handleSettingChange('reminderInterval', parseInt(e.target.value))}
                  className="input-field w-full"
                >
                  <option value={15}>{t('settings.notifications.minutes15')}</option>
                  <option value={30}>{t('settings.notifications.minutes30')}</option>
                  <option value={60}>{t('settings.notifications.hour1')}</option>
                  <option value={120}>{t('settings.notifications.hours2')}</option>
                  <option value={240}>{t('settings.notifications.hours4')}</option>
                </select>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('settings.notifications.reminderIntervalDesc')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 外观设置 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.appearance.title')}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                {t('settings.appearance.theme')}
              </label>
              <select
                value={localSettings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="input-field w-full"
              >
                <option value="light">{t('settings.appearance.lightMode')}</option>
                <option value="dark">{t('settings.appearance.darkMode')}</option>
                <option value="auto">{t('settings.appearance.autoMode')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                {t('settings.appearance.language')}
              </label>
              <select
                value={localSettings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="input-field w-full"
              >
                <option value="zh-CN">{t('settings.appearance.chinese')}</option>
                <option value="en-US">{t('settings.appearance.english')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 数据管理 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.dataManagement.title')}
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                {t('settings.dataManagement.dangerousOperation')}
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                {t('settings.dataManagement.clearDataWarning')}
              </p>
              <button
                onClick={handleClearData}
                className="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t('settings.dataManagement.clearAllData')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 关于 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.about.title')}
          </h2>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              {t('settings.about.description')}
            </p>
            <p>
              {t('settings.about.version')}<br />
              {t('settings.about.techStack')}
            </p>
            <p>
              {t('settings.about.privacy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 