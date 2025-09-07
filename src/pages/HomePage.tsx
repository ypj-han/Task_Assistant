import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Download, Upload, AlertTriangle } from 'lucide-react';
import GoalInput from '../components/GoalInput';
import GoalCard from '../components/GoalCard';
import { Goal } from '../types';
import { StorageManager } from '../utils/storage';
import { downloadFile } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const storedGoals = StorageManager.getGoals();
    setGoals(storedGoals);
  };

  const handleGoalCreated = (newGoal: Goal) => {
    setGoals(prev => [newGoal, ...prev]);
    setShowInput(false);
  };

  const handleGoalDelete = (goalId: string) => {
    if (window.confirm(t('confirm.deleteGoal'))) {
      StorageManager.deleteGoal(goalId);
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      toast.success(t('messages.goalDeleted'));
    }
  };

  const handleExportData = () => {
    const data = StorageManager.exportData();
    downloadFile(data, `task-decomposition-data-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    toast.success(t('messages.dataExported'));
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const success = StorageManager.importData(data);
        if (success) {
          loadGoals();
          toast.success(t('messages.dataImported'));
        } else {
          toast.error(t('messages.importFailed'));
        }
      } catch (error) {
        toast.error(t('messages.importFailed'));
      }
    };
    reader.readAsText(file);
    
    // 清除文件输入
    event.target.value = '';
  };

  const handleClearData = () => {
    if (window.confirm(t('confirm.clearAllData'))) {
      StorageManager.clearAllData();
      setGoals([]);
      toast.success(t('settings.dataManagement.dataCleared'));
    }
  };

  const filteredGoals = goals.filter(goal => {
    switch (filter) {
      case 'active':
        return !goal.isCompleted;
      case 'completed':
        return goal.isCompleted;
      default:
        return true;
    }
  });

  const activeGoals = goals.filter(goal => !goal.isCompleted);
  const completedGoals = goals.filter(goal => goal.isCompleted);

  return (
    <div className="max-w-6xl mx-auto">
      {/* 头部统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {goals.length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{t('home.totalGoals')}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">
            {activeGoals.length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{t('home.inProgress')}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            {completedGoals.length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{t('home.completed')}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowInput(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('home.newGoal')}</span>
          </button>

          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="input-field w-auto"
            >
              <option value="all">{t('home.allGoals')}</option>
              <option value="active">{t('home.activeGoals')}</option>
              <option value="completed">{t('home.completedGoals')}</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{t('home.importData')}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportData}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{t('home.exportData')}</span>
          </button>

          <button
            onClick={handleClearData}
            className="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('home.clearData')}</span>
          </button>
        </div>
      </div>

      {/* 目标输入 */}
      {showInput && (
        <div className="mb-8">
          <GoalInput onGoalCreated={handleGoalCreated} />
        </div>
      )}

      {/* 目标列表 */}
      {filteredGoals.length === 0 ? (
        <div className="text-center py-12">
          {goals.length === 0 ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('home.noGoals')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.noGoalsDesc')}
              </p>
              <button
                onClick={() => setShowInput(true)}
                className="btn-primary"
              >
                {t('home.createFirstGoal')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('home.noMatchingGoals')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.noMatchingGoalsDesc')}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={handleGoalDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage; 