export const zhCN = {
  appTitle: "Claude Code Launcher",
  langToggle: "EN",
  themeLight: "浅色",
  themeDark: "深色",
  claudeAvailable: "Claude Code CLI 已就绪",
  claudeUnavailable: "未检测到 Claude Code CLI",
  claudeUnavailableHint: "请先安装 Claude Code，并确认 claude 命令已加入 PATH。",

  projectCard: "项目选择",
  addFavorite: "＋ 收藏当前项目",
  selectDir: "选择目录",
  noProjectSelected: "未选择项目目录",

  tabRecent: "最近项目",
  tabFavorite: "收藏项目",
  colFolder: "文件夹名",
  colAlias: "备注",
  colPath: "项目路径",
  noProjects: "暂无项目",

  editAlias: "编辑备注",
  deleteProject: "删除记录",
  unfavorite: "取消收藏",
  favoriteProject: "收藏",

  editAliasTitle: "编辑项目备注",
  aliasLabel: "备注名",
  aliasPlaceholder: "输入备注名（可留空）",
  cancel: "取消",
  save: "保存",

  gitBranch: "Git 分支",
  gitNotRepo: "非 Git 仓库",
  gitNotRepoHint: "可能是当前目录的下级目录",
  gitSubdirHint: "子目录分支，启动路径仍为当前目录",
  gitNoRemote: "无分支",
  gitSwitchSuccess: "已切换到",
  gitSwitchFailed: "切换失败",
  gitCurrentBranch: "当前分支",
  gitRefresh: "刷新分支",

  launchMode: "启动模式",
  modeNew: "新会话",
  modeContinue: "Continue 上次会话",
  modeResume: "Resume 选择历史会话",

  modelConfig: "模型配置",
  provider: "供应商",
  presetModel: "指定模型",
  customModel: "自定义模型",
  customModelPlaceholder: "输入自定义模型名",
  noModel: "不指定模型",
  nonClaudeHint: "非 Claude 模型需要你的 Claude Code 当前环境已完成兼容中转配置。本启动器只负责传递模型名。",

  permissionMode: "权限模式",
  bypassLabel: "Bypass permissions",
  bypassHint: "Bypass 会跳过部分权限确认，请仅在可信项目目录中使用。",

  commandPreview: "命令预览",
  copyCommand: "复制",
  copied: "已复制",

  launchButton: "启动 Claude Code CLI",
  launching: "启动中...",
  projectNotExist: "项目目录不存在，请重新选择。",
  terminalFailed: "无法启动系统终端，请检查终端是否可用。",
  selectProjectFirst: "请先选择项目目录。",
};

export type I18nKeys = keyof typeof zhCN;
