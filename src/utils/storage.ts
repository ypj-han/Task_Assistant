import { Goal, Task, UserSettings } from '../types';

const STORAGE_KEYS = {
  GOALS: 'task_decomposition_goals',
  SETTINGS: 'task_decomposition_settings',
  NOTIFICATIONS: 'task_decomposition_notifications',
} as const;

export class StorageManager {
  // 目标管理
  static getGoals(): Goal[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (!stored) return [];
      
      const goals = JSON.parse(stored);
      return goals.map((goal: any) => ({
        ...goal,
        createdAt: new Date(goal.createdAt),
        completedAt: goal.completedAt ? new Date(goal.completedAt) : undefined,
        tasks: goal.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        })),
      }));
    } catch (error) {
      console.error('读取目标数据失败:', error);
      return [];
    }
  }

  static saveGoals(goals: Goal[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (error) {
      console.error('保存目标数据失败:', error);
    }
  }

  static addGoal(goal: Goal): void {
    const goals = this.getGoals();
    goals.push(goal);
    this.saveGoals(goals);
  }

  static updateGoal(goalId: string, updates: Partial<Goal>): void {
    const goals = this.getGoals();
    const index = goals.findIndex(g => g.id === goalId);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates };
      this.saveGoals(goals);
    }
  }

  static deleteGoal(goalId: string): void {
    const goals = this.getGoals();
    const filtered = goals.filter(g => g.id !== goalId);
    this.saveGoals(filtered);
  }

  // 任务管理
  static updateTask(goalId: string, taskId: string, updates: Partial<Task>): void {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
      const taskIndex = goals[goalIndex].tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        goals[goalIndex].tasks[taskIndex] = { 
          ...goals[goalIndex].tasks[taskIndex], 
          ...updates 
        };
        this.saveGoals(goals);
      }
    }
  }

  // 设置管理
  static getSettings(): UserSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!stored) {
        return {
          notifications: true,
          reminderInterval: 30,
          theme: 'light',
          language: 'en-US',
        };
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('读取设置失败:', error);
      return {
        notifications: true,
        reminderInterval: 30,
        theme: 'light',
        language: 'en-US',
      };
    }
  }

  static saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  }

  // 数据清理
  static clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('清理数据失败:', error);
    }
  }

  // 数据导出
  static exportData(): string {
    const data = {
      goals: this.getGoals(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  // 数据导入
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.goals) {
        this.saveGoals(data.goals);
      }
      if (data.settings) {
        this.saveSettings(data.settings);
      }
      return true;
    } catch (error) {
      console.error('导入数据失败:', error);
      return false;
    }
  }
} 