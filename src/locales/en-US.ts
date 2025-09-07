export const enUS = {
  // Common
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    back: 'Back',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },

  // Navigation
  nav: {
    home: 'Home',
    settings: 'Settings',
    taskDecompositionAssistant: 'Task Decomposition Assistant',
  },

  // Home
  home: {
    title: 'Task Decomposition Assistant',
    subtitle: 'Break down complex goals into executable small steps',
    totalGoals: 'Total Goals',
    inProgress: 'In Progress',
    completed: 'Completed',
    newGoal: 'New Goal',
    allGoals: 'All Goals',
    activeGoals: 'Active',
    completedGoals: 'Completed',
    importData: 'Import Data',
    exportData: 'Export Data',
    clearData: 'Clear Data',
    noGoals: 'No goals yet',
    noGoalsDesc: 'Click "New Goal" to start your first task decomposition',
    createFirstGoal: 'Create First Goal',
    noMatchingGoals: 'No matching goals found',
    noMatchingGoalsDesc: 'Try adjusting the filter criteria',
  },

  // Goal Input
  goalInput: {
    title: 'Enter Your Goal',
    subtitle: 'Describe the goal you want to achieve, and we will help you break it down into executable small steps',
    placeholder: 'e.g., Organize my room, Prepare for tomorrow\'s meeting, Learn a new skill...',
    decomposeGoal: 'Decompose Goal',
    recording: 'Recording...',
    tips: {
      title: '💡 Tips',
      tip1: '• Describe specific goals, not abstract concepts',
      tip2: '• You can include time limits or priority information',
      tip3: '• Voice input is supported, click the microphone icon to start recording',
      tip4: '• Each subtask will be controlled within 30 minutes',
    },
  },

  // Goal Card
  goalCard: {
    createdOn: 'Created on',
    estimatedTime: 'Estimated',
    taskProgress: 'Task Progress',
    viewDetails: 'View Details',
    progress: 'Progress',
    hours: 'hours',
    noTasks: 'No tasks',
    completed: 'Completed',
    inProgress: 'In Progress',
    andMore: 'and {count} more tasks...',
  },

  // Goal Detail
  goalDetail: {
    taskList: 'Task List',
    addTask: 'Add Task',
    newTask: 'Add New Task',
    taskTitle: 'Task Title',
    estimatedTime: 'Estimated Time',
    minutes: 'minutes',
    addTaskButton: 'Add Task',
    noTasks: 'No tasks yet, click "Add Task" to start',
    addFirstTask: 'Add First Task',
    completedTasks: 'Completed Tasks',
    totalTasks: 'Total Tasks',
    remainingTime: 'Remaining Time',
    completionProgress: 'Completion Progress',
    backToHome: 'Back to Home',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    titlePlaceholder: 'Goal title',
    categoryPlaceholder: 'Category (optional)',
    createdAt: 'Created at',
    progress: 'Progress',
    complete: 'complete',
    tasks: 'Tasks',
    taskTitlePlaceholder: 'Task title',
    taskDescriptionPlaceholder: 'Task description (optional)',
  },

  // Task Item
  taskItem: {
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    taskCompleted: 'Task completed!',
    taskUpdated: 'Task updated',
    invalidTime: 'Please enter a valid time',
    estimatedTime: 'Estimated time',
    minutes: 'minutes',
    hours: 'hours',
    titlePlaceholder: 'Task title',
    descriptionPlaceholder: 'Task description',
    save: 'Save',
    cancel: 'Cancel',
    priority: {
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority'
    },
  },

  // Settings
  settings: {
    title: 'Settings',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved',
    
    // Notifications
    notifications: {
      title: 'Notification Settings',
      enableNotifications: 'Enable Notifications',
      enableNotificationsDesc: 'Receive task reminders and progress updates',
      reminderInterval: 'Reminder Interval',
      reminderIntervalDesc: 'Set the time interval for task reminders',
      minutes15: '15 minutes',
      minutes30: '30 minutes',
      hour1: '1 hour',
      hours2: '2 hours',
      hours4: '4 hours',
    },

    // Appearance
    appearance: {
      title: 'Appearance Settings',
      theme: 'Theme Mode',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      autoMode: 'Follow System',
      language: 'Language',
      chinese: '中文（简体）',
      english: 'English',
    },

    // Data Management
    dataManagement: {
      title: 'Data Management',
      dangerousOperation: '⚠️ Dangerous Operation',
      clearDataWarning: 'Clearing data will permanently delete all goals and tasks. This action cannot be undone.',
      clearAllData: 'Clear All Data',
      dataCleared: 'All data cleared',
      exportData: 'Export Data',
      importData: 'Import Data',
      dataExported: 'Data exported successfully',
      dataImported: 'Data imported successfully',
      confirmClear: 'Are you sure you want to clear all data? This action cannot be undone.',
    },

    // About
    about: {
      title: 'About',
      description: 'Task Decomposition Assistant is a tool designed for ADHD users to help break down complex goals into executable small steps.',
      version: 'Version: 1.0.0',
      techStack: 'Built with React + TypeScript + TailwindCSS',
      privacy: 'Privacy Protection: All data is stored locally only and will not be uploaded to servers. Supports one-click data clearing within 24 hours.',
    },
  },

  // Messages
  messages: {
    goalCreated: 'Goal created successfully!',
    goalDeleted: 'Goal deleted',
    goalNotFound: 'Goal not found',
    dataExported: 'Data exported successfully',
    dataImported: 'Data imported successfully',
    importFailed: 'Data import failed, please check the file format',
    createGoalFailed: 'Failed to create goal, please try again',
    voiceRecognitionFailed: 'Voice recognition failed, please try again',
    microphoneAccessFailed: 'Cannot access microphone, please check permissions',
    recordingStarted: 'Recording started',
    recordingStopped: 'Recording stopped',
    voiceRecognitionComplete: 'Voice recognition complete',
    goalUpdated: 'Goal updated successfully',
    taskAdded: 'Task added successfully',
    taskUpdated: 'Task updated successfully',
    taskDeleted: 'Task deleted',
    taskCompleted: 'Task completed!',
    invalidTime: 'Please enter a valid time',
  },

  // Confirm Dialogs
  confirm: {
    deleteGoal: 'Are you sure you want to delete this goal? This action cannot be undone.',
    deleteTask: 'Are you sure you want to delete this task?',
    clearAllData: 'Are you sure you want to clear all data? This action cannot be undone.',
  },

  // Time Formatting
  time: {
    minutes: 'minutes',
    hours: 'hours',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
  },
}; 