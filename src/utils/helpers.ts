import { Task, Goal } from '../types';

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 格式化时间
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}小时`;
  }
  return `${hours}小时${remainingMinutes}分钟`;
};

// 格式化日期
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return '今天';
  } else if (diffInDays === 1) {
    return '昨天';
  } else if (diffInDays < 7) {
    return `${diffInDays}天前`;
  } else {
    return date.toLocaleDateString('zh-CN');
  }
};

// 计算目标完成进度
export const calculateProgress = (goal: Goal): number => {
  if (goal.tasks.length === 0) return 0;
  const completedTasks = goal.tasks.filter(task => task.isCompleted).length;
  return Math.round((completedTasks / goal.tasks.length) * 100);
};

// 计算总时间
export const calculateTotalTime = (tasks: Task[]): number => {
  return tasks.reduce((total, task) => total + task.estimatedTime, 0);
};

// 计算剩余时间
export const calculateRemainingTime = (goal: Goal): number => {
  const incompleteTasks = goal.tasks.filter(task => !task.isCompleted);
  return calculateTotalTime(incompleteTasks);
};

// 获取优先级颜色
export const getPriorityColor = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

// 获取优先级文本
export const getPriorityText = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return '高';
    case 'medium':
      return '中';
    case 'low':
      return '低';
    default:
      return '未知';
  }
};

// 验证目标输入
export const validateGoalInput = (input: string): { isValid: boolean; error?: string } => {
  if (!input.trim()) {
    return { isValid: false, error: '请输入目标内容' };
  }
  if (input.length < 3) {
    return { isValid: false, error: '目标描述至少需要3个字符' };
  }
  if (input.length > 500) {
    return { isValid: false, error: '目标描述不能超过500个字符' };
  }
  return { isValid: true };
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 复制到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

// 下载文件
export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 