export const home = {
  pill: 'AI 原生的建筑智能',
  h1Line1: '为建造世界',
  h1Line2Prefix: '注入',
  h1Line2Accent: '智能。',
  lede: '把 BIM、进度计划、文档、现场证据与 AI 连接成一个持续运转的项目智能系统。',
  ctaPrimary: '预约企业演示',
  ctaSecondary: '体验 Construction Twin',
  principle: ['看见', '理解', '预测', '行动'],
  signals: [
    {
      title: '证据优先',
      text: '没有匹配到记录？回答的置信度封顶 0.4，并且会直说。'
    },
    {
      title: '引用可核验',
      text: '我们核验自己 AI 的引用，并点名它无法支撑的那一条。'
    },
    {
      title: '准确度公开',
      text: '每个预测都以固定容差，对照实际发生的结果评分。'
    }
  ],
  signalsLink: '看看每一条是如何被强制执行的 →',

  dataFlow: {
    eyebrow: '从数据到智能',
    title: '把割裂的项目数据变成能做决策的活系统。',
    copy: 'OneAI Construction 连接空间、时间、文档、证据与决策中的项目上下文，再把这些上下文转化为可用的智能。',
    inputs: ['BIM / IFC', '进度计划', '文档', '现场证据'],
    brand: 'ONEAI CONSTRUCTION',
    output: '理解 · 预测 · 行动'
  },
  products: {
    eyebrow: '两个核心产品',
    title: '一个操作系统，一个持续演化的项目孪生。',
    copy: '既可独立使用，也可合并为同一个项目智能层。',
    os: {
      label: '01 / CONSTRUCTION OS',
      title: '建筑智能的操作系统。',
      text: '在项目全生命周期内连接人员、工作流、项目知识与 AI 智能体。',
      features: [
        '文档智能',
        '项目知识',
        'RFI / NCR / 验收',
        '工作流自动化',
        '施工智能体',
        '治理与审计'
      ],
      link: '了解 Construction OS →'
    },
    twin: {
      label: '02 / CONSTRUCTION TWIN',
      title: '项目的活体 AI 表征。',
      text: '连接 BIM、进度、证据与 AI，理解正在发生什么，以及接下来会发生什么。',
      features: ['IFC / BIM', '4D 进度', '孪生实体', '证据图谱', '风险智能', '预测与仿真'],
      link: '了解 Construction Twin →'
    }
  },
  ask: {
    eyebrow: 'ASK TWIN',
    title: '向项目提问，得到可追溯的答案。',
    copy: '这不是又一个聊天机器人。每一条结论都由你可以打开的原始记录构成——证据缺失时，孪生会直接说明。'
  },
  timeline: {
    eyebrow: '4D 项目智能',
    title: '在时间维度上看见项目。',
    copy: '在同一份项目上下文中对比基线、实际进度与预测区间。拖动数据日期，观察不确定性区间如何变化。'
  },
  metricsLink: '查看完整验证报告 →',
  prediction: {
    eyebrow: '从报告到预测',
    title: '在风险变成报告之前就知道它。',
    copy: '从静态看板走向概率预测、可解释的驱动因素，以及基于情景的恢复计划。',
    items: [
      { title: '风险智能', text: '用可追溯到证据的风险驱动因素，量化概率、影响与敞口。' },
      { title: 'P10 / P50 / P90 预测', text: '理解工期结果的可能区间，而不是依赖一个孤立的日期。' },
      { title: 'What-if 仿真', text: '在行动之前，比较恢复方案、资源调整与下游工期影响。' }
    ]
  },
  agents: {
    eyebrow: '施工智能体',
    title: '能干活的 AI，而不只是能回答的 AI。',
    copy: '在清晰的权限范围内观察、推理并给出建议。人始终掌握控制权，每一个关键动作都可审计。',
    steps: ['观察', '推理', '建议', '人工批准', '执行', '审计']
  },
  architecture: {
    eyebrow: '平台架构',
    title: '作为智能层构建——而不是又一个数据孤岛。',
    copy: '连接既有的设计、进度与项目管控系统，同时保持 AI 基础设施与模型无关、由企业掌控。'
  },
  industries: {
    eyebrow: '行业',
    title: '为协同复杂度高的项目而建。',
    copy: '优先切入那些项目数据、工期风险与多方履约共同带来最高智能价值的领域。',
    items: [
      { title: '轨道交通', text: '车站、车辆段、轨道基础设施与多标段接口。' },
      { title: '房建', text: '复杂公共建筑、商业、超高层与综合体项目。' },
      { title: '工业厂房', text: '工厂、数据中心、制造与关键任务设施。' },
      { title: '基础设施', text: '机场、桥梁、道路与大型资本项目群。' }
    ]
  },
  pilot: {
    eyebrow: '企业试点',
    title: '从一个项目开始，验证可量化的价值。',
    copy: '在受控范围内部署，接入既有项目数据，度量 OneAI Construction 是否真的提升了可见性、风险发现与决策速度。',
    inputsLabel: '输入',
    inputs: 'IFC · 基线进度 · 施工日志 · RFI/NCR · 验收记录 · 现场照片',
    outputsLabel: '输出',
    outputs: '实际 vs 计划 · 延误成因 · 风险 · 预测 · 证据 · 缓解方案',
    cta: '启动企业试点'
  },
  finalCta: {
    eyebrow: 'ONEAI CONSTRUCTION',
    title: '用智能来建造。',
    copy: '把项目上下文汇聚起来。看清真正重要的事。在问题变成结果之前采取行动。',
    primary: '预约企业演示',
    secondary: '了解平台'
  }
} as const;
