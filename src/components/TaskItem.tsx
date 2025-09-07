import React, { useState } from 'react';
import { CheckCircle, Circle, Edit, Trash2, Save, X } from 'lucide-react';
import { Task } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onUpdate, onDelete }) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(t('confirm.deleteTask'))) {
      onDelete(task.id);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${t('taskItem.minutes')}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} ${t('taskItem.hours')}`;
    }
    return `${hours} ${t('taskItem.hours')} ${remainingMinutes} ${t('taskItem.minutes')}`;
  };

  if (isEditing) {
    return (
      <div className="card p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-field font-medium"
            placeholder={t('taskItem.titlePlaceholder')}
          />
          
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="input-field min-h-[80px] resize-none"
            placeholder={t('taskItem.descriptionPlaceholder')}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{t('taskItem.estimatedTime')}: {formatTime(task.estimatedTime)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{t('taskItem.save')}</span>
              </button>
              
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>{t('taskItem.cancel')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 mt-1"
          aria-label={task.isCompleted ? '标记为未完成' : '标记为已完成'}
        >
          {task.isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${
            task.isCompleted 
              ? 'text-gray-500 dark:text-gray-400 line-through' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.isCompleted 
                ? 'text-gray-400 dark:text-gray-500 line-through' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{t('taskItem.estimatedTime')}: {formatTime(task.estimatedTime)}</span>
              {task.priority && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {t(`taskItem.priority.${task.priority}`)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="编辑任务"
              >
                <Edit className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleDelete}
                className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                aria-label="删除任务"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 