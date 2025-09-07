export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number; // 分钟
  isCompleted: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
  isCompleted: boolean;
  completedAt?: Date;
  category?: string;
}

export interface DecompositionRequest {
  goal: string;
  category?: string;
  estimatedTotalTime?: number; // 分钟
}

export interface DecompositionResponse {
  goal: string;
  tasks: Omit<Task, 'id' | 'isCompleted' | 'createdAt' | 'completedAt'>[];
  estimatedTotalTime: number;
  category?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface UserSettings {
  notifications: boolean;
  reminderInterval: number; // 分钟
  theme: 'light' | 'dark' | 'auto';
  language: 'zh-CN' | 'en-US';
}

export interface NotificationSettings {
  enabled: boolean;
  interval: number; // 分钟
  sound: boolean;
  vibration: boolean;
} 