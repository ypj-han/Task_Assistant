import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, Circle, Trash2, Edit } from 'lucide-react';
import { Goal } from '../types';
import { StorageManager } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface GoalCardProps {
  goal: Goal;
  onDelete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete }) => {
  const { t } = useLanguage();

  const completedTasks = goal.tasks.filter(task => task.isCompleted).length;
  const totalTasks = goal.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '工作': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      '学习': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      '生活': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      '健康': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      '其他': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors['其他'];
  };

  const getCategoryColorEn = (category: string) => {
    const colors: { [key: string]: string } = {
      'work': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'study': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'life': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'health': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors['other'];
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(goal.id);
  };

  return (
    <Link to={`/goal/${goal.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {goal.title}
            </h3>
            
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category || '其他')}`}>
                {goal.category || '其他'}
              </span>
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(goal.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleDelete}
              className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              aria-label="删除目标"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {t('goalCard.progress')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {completedTasks}/{totalTasks}
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {totalTasks > 0 ? `${Math.ceil(totalTasks * 0.5)} ${t('goalCard.hours')}` : t('goalCard.noTasks')}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {goal.isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {goal.isCompleted ? t('goalCard.completed') : t('goalCard.inProgress')}
              </span>
            </div>
          </div>
        </div>

        {goal.tasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {goal.tasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center space-x-2">
                  {task.isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm line-clamp-1 ${
                    task.isCompleted 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {task.title}
                  </span>
                </div>
              ))}
              {goal.tasks.length > 3 && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('goalCard.andMore').replace('{count}', (goal.tasks.length - 3).toString())}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GoalCard; 