export const zhCN = {
  // 通用
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    back: '返回',
    confirm: '确认',
    loading: '加载中...',
    error: '错误',
    success: '成功',
  },

  // 导航
  nav: {
    home: '首页',
    settings: '设置',
    taskDecompositionAssistant: '任务拆解助手',
  },

  // 首页
  home: {
    title: '任务拆解助手',
    subtitle: '将复杂目标拆解为可执行的小步骤',
    totalGoals: '总目标数',
    inProgress: '进行中',
    completed: '已完成',
    newGoal: '新建目标',
    allGoals: '全部目标',
    activeGoals: '进行中',
    completedGoals: '已完成',
    importData: '导入数据',
    exportData: '导出数据',
    clearData: '清除数据',
    noGoals: '还没有目标',
    noGoalsDesc: '点击"新建目标"开始你的第一个任务拆解',
    createFirstGoal: '创建第一个目标',
    noMatchingGoals: '没有找到匹配的目标',
    noMatchingGoalsDesc: '尝试调整筛选条件',
  },

  // 目标输入
  goalInput: {
    title: '输入你的目标',
    subtitle: '描述你想要完成的目标，我们将帮你拆解成可执行的小步骤',
    placeholder: '例如：整理我的房间、准备明天的会议、学习一门新技能...',
    decomposeGoal: '拆解目标',
    recording: '正在录音...',
    tips: {
      title: '💡 提示',
      tip1: '• 描述具体的目标，而不是抽象的概念',
      tip2: '• 可以包含时间限制或优先级信息',
      tip3: '• 支持语音输入，点击麦克风图标开始录音',
      tip4: '• 每个子任务都会被控制在30分钟以内',
    },
  },

  // 目标卡片
  goalCard: {
    createdOn: '创建于',
    estimatedTime: '预计',
    taskProgress: '任务进度',
    viewDetails: '查看详情',
    progress: '任务进度',
    hours: '小时',
    noTasks: '无任务',
    completed: '已完成',
    inProgress: '进行中',
    andMore: '还有 {count} 个任务...',
  },

  // 目标详情
  goalDetail: {
    taskList: '任务列表',
    addTask: '添加任务',
    newTask: '添加新任务',
    taskTitle: '任务标题',
    estimatedTime: '预计时间',
    minutes: '分钟',
    addTaskButton: '添加任务',
    noTasks: '还没有任务，点击"添加任务"开始',
    addFirstTask: '添加第一个任务',
    completedTasks: '已完成的任务',
    totalTasks: '总任务数',
    remainingTime: '剩余时间',
    completionProgress: '完成进度',
    backToHome: '返回首页',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    titlePlaceholder: '目标标题',
    categoryPlaceholder: '分类（可选）',
    createdAt: '创建时间',
    progress: '进度',
    complete: '完成',
    tasks: '任务列表',
    taskTitlePlaceholder: '任务标题',
    taskDescriptionPlaceholder: '任务描述（可选）',
  },

  // 任务项
  taskItem: {
    highPriority: '高优先级',
    mediumPriority: '中优先级',
    lowPriority: '低优先级',
    taskCompleted: '任务完成！',
    taskUpdated: '任务已更新',
    invalidTime: '请输入有效的时间',
    estimatedTime: '预计时间',
    descriptionPlaceholder: '任务描述',
    priority: {
      high: '高优先级',
      medium: '中优先级',
      low: '低优先级'
    },
  },

  // 设置
  settings: {
    title: '设置',
    saveSettings: '保存设置',
    settingsSaved: '设置已保存',
    
    // 通知设置
    notifications: {
      title: '通知设置',
      enableNotifications: '启用通知',
      enableNotificationsDesc: '接收任务提醒和进度更新',
      reminderInterval: '提醒间隔',
      reminderIntervalDesc: '设置任务提醒的时间间隔',
      minutes15: '15分钟',
      minutes30: '30分钟',
      hour1: '1小时',
      hours2: '2小时',
      hours4: '4小时',
    },

    // 外观设置
    appearance: {
      title: '外观设置',
      theme: '主题模式',
      lightMode: '浅色模式',
      darkMode: '深色模式',
      autoMode: '跟随系统',
      language: '语言',
      chinese: '中文（简体）',
      english: 'English',
    },

    // 数据管理
    dataManagement: {
      title: '数据管理',
      dangerousOperation: '⚠️ 危险操作',
      clearDataWarning: '清除数据将永久删除所有目标和任务，此操作不可撤销。',
      clearAllData: '清除所有数据',
      dataCleared: '所有数据已清除',
      exportData: '导出数据',
      importData: '导入数据',
      dataExported: '数据导出成功',
      dataImported: '数据导入成功',
      confirmClear: '确定要清除所有数据吗？此操作不可撤销。',
    },

    // 关于
    about: {
      title: '关于',
      description: '任务拆解助手 是一个专为 ADHD 用户设计的工具，帮助将复杂目标拆解为可执行的小步骤。',
      version: '版本：1.0.0',
      techStack: '基于 React + TypeScript + TailwindCSS 构建',
      privacy: '隐私保护：所有数据仅存储在本地，不会上传到服务器。支持24小时内一键数据清除。',
    },
  },

  // 消息
  messages: {
    goalCreated: '目标创建成功！',
    goalDeleted: '目标已删除',
    goalNotFound: '目标不存在',
    dataExported: '数据导出成功',
    dataImported: '数据导入成功',
    importFailed: '数据导入失败，请检查文件格式',
    createGoalFailed: '创建目标失败，请重试',
    voiceRecognitionFailed: '语音识别失败，请重试',
    microphoneAccessFailed: '无法访问麦克风，请检查权限设置',
    recordingStarted: '开始录音',
    recordingStopped: '录音结束',
    voiceRecognitionComplete: '语音识别完成',
    goalUpdated: '目标更新成功',
    taskAdded: '任务添加成功',
    taskUpdated: '任务更新成功',
    taskDeleted: '任务已删除',
    invalidTime: '请输入有效的时间',
  },

  // 确认对话框
  confirm: {
    deleteGoal: '确定要删除这个目标吗？此操作不可撤销。',
    deleteTask: '确定要删除这个任务吗？',
    clearAllData: '确定要清除所有数据吗？此操作不可撤销。',
  },

  // 时间格式化
  time: {
    minutes: '分钟',
    hours: '小时',
    today: '今天',
    yesterday: '昨天',
    daysAgo: '天前',
  },
}; 