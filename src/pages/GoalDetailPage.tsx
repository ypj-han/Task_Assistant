import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X, Trash2, Plus, CheckCircle, Circle } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import { Goal, Task } from '../types';
import { StorageManager } from '../utils/storage';
import { generateId } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const GoalDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('30');

  useEffect(() => {
    if (goalId) {
      const goals = StorageManager.getGoals();
      const foundGoal = goals.find(g => g.id === goalId);
      if (foundGoal) {
        setGoal(foundGoal);
        setEditTitle(foundGoal.title);
        setEditCategory(foundGoal.category || '');
      } else {
        toast.error(t('messages.goalNotFound'));
        navigate('/');
      }
    }
  }, [goalId, navigate, t]);

  const handleSaveGoal = () => {
    if (!goal || !editTitle.trim()) return;

    const updatedGoal: Goal = {
      ...goal,
      title: editTitle.trim(),
      category: editCategory.trim() || undefined,
    };

    StorageManager.updateGoal(goal.id, updatedGoal);
    setGoal(updatedGoal);
    setIsEditing(false);
    toast.success(t('messages.goalUpdated'));
  };

  const handleCancelEdit = () => {
    if (goal) {
      setEditTitle(goal.title);
      setEditCategory(goal.category || '');
    }
    setIsEditing(false);
  };

  const handleDeleteGoal = () => {
    if (!goal) return;

    if (window.confirm(t('confirm.deleteGoal'))) {
      StorageManager.deleteGoal(goal.id);
      toast.success(t('messages.goalDeleted'));
      navigate('/');
    }
  };

  const handleToggleTask = (taskId: string) => {
    if (!goal) return;

    const updatedTasks = goal.tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date() : undefined,
          }
        : task
    );

    const updatedGoal: Goal = {
      ...goal,
      tasks: updatedTasks,
      isCompleted: updatedTasks.every(task => task.isCompleted),
    };

    StorageManager.updateGoal(goal.id, updatedGoal);
    setGoal(updatedGoal);

    const task = updatedTasks.find(t => t.id === taskId);
    if (task?.isCompleted) {
      toast.success(t('messages.taskCompleted'));
    }
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    if (!goal) return;

    const updatedTasks = goal.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    const updatedGoal: Goal = {
      ...goal,
      tasks: updatedTasks,
    };

    StorageManager.updateGoal(goal.id, updatedGoal);
    setGoal(updatedGoal);
    toast.success(t('messages.taskUpdated'));
  };

  const handleDeleteTask = (taskId: string) => {
    if (!goal) return;

    const updatedTasks = goal.tasks.filter(task => task.id !== taskId);
    const updatedGoal: Goal = {
      ...goal,
      tasks: updatedTasks,
      isCompleted: updatedTasks.length > 0 && updatedTasks.every(task => task.isCompleted),
    };

    StorageManager.updateGoal(goal.id, updatedGoal);
    setGoal(updatedGoal);
    toast.success(t('messages.taskDeleted'));
  };

  const handleAddTask = () => {
    if (!goal || !newTaskTitle.trim()) return;

    const time = parseInt(newTaskTime);
    if (isNaN(time) || time <= 0) {
      toast.error(t('messages.invalidTime'));
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      estimatedTime: time,
      priority: 'medium',
      isCompleted: false,
      createdAt: new Date(),
    };

    const updatedGoal: Goal = {
      ...goal,
      tasks: [...goal.tasks, newTask],
    };

    StorageManager.updateGoal(goal.id, updatedGoal);
    setGoal(updatedGoal);
    setShowAddTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskTime('30');
    toast.success(t('messages.taskAdded'));
  };

  if (!goal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('messages.loading')}</p>
        </div>
      </div>
    );
  }

  const completedTasks = goal.tasks.filter(task => task.isCompleted).length;
  const totalTasks = goal.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('goalDetail.backToHome')}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>{t('goalDetail.edit')}</span>
          </button>

          <button
            onClick={handleDeleteGoal}
            className="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('goalDetail.delete')}</span>
          </button>
        </div>
      </div>

      {/* 目标信息 */}
      <div className="card mb-8">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input-field text-xl font-bold"
              placeholder={t('goalDetail.titlePlaceholder')}
            />
            
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="input-field"
              placeholder={t('goalDetail.categoryPlaceholder')}
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveGoal}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{t('goalDetail.save')}</span>
              </button>
              
              <button
                onClick={handleCancelEdit}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>{t('goalDetail.cancel')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {goal.title}
              </h1>
              
              <div className="flex items-center space-x-2">
                {goal.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {goal.isCompleted ? t('goalDetail.completed') : t('goalDetail.inProgress')}
                </span>
              </div>
            </div>

            {goal.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm font-medium">
                  {goal.category}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{t('goalDetail.createdAt')}: {formatDate(goal.createdAt)}</span>
              <span>{t('goalDetail.totalTasks')}: {totalTasks}</span>
            </div>
          </div>
        )}
      </div>

      {/* 进度条 */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('goalDetail.progress')}
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedTasks}/{totalTasks} {t('goalDetail.completed')}
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {progress}% {t('goalDetail.complete')}
        </div>
      </div>

      {/* 任务列表 */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('goalDetail.tasks')}
          </h2>
          
          <button
            onClick={() => setShowAddTask(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('goalDetail.addTask')}</span>
          </button>
        </div>

        {showAddTask && (
          <div className="card mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              {t('goalDetail.newTask')}
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="input-field"
                placeholder={t('goalDetail.taskTitlePlaceholder')}
              />
              
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="input-field min-h-[80px] resize-none"
                placeholder={t('goalDetail.taskDescriptionPlaceholder')}
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="input-field w-24"
                  min="1"
                  max="480"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('goalDetail.minutes')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddTask}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('goalDetail.addTask')}</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowAddTask(false);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                    setNewTaskTime('30');
                  }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>{t('goalDetail.cancel')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {goal.tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {t('goalDetail.noTasks')}
            </p>
            <button
              onClick={() => setShowAddTask(true)}
              className="btn-primary mt-4"
            >
              {t('goalDetail.addFirstTask')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goal.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalDetailPage; 