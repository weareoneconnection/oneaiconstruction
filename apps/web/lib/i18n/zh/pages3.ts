export const pages3 = {
  pilot: {
    meta: {
      title: '企业试点',
      description:
        '从一个项目和一个可量化的问题开始。范围固定的 8–12 周试点，成功指标在开工前落成书面。'
    },
    eyebrow: '企业试点',
    h1: '从一个项目、一个可量化的问题开始。',
    lede: '受控的范围能在任何人需要为平台决策辩护之前，先验证技术契合度、业务价值与采用情况。',
    ctaPrimary: '申请试点',
    ctaSecondary: '查看合作模式',
    firstPilotEyebrow: '推荐的首个试点',
    firstPilotTitle: '进度与项目智能。',
    firstPilot: [
      {
        label: '场景',
        title: '进度与项目智能',
        text: '接入 IFC/BIM、基线进度、施工日志、验收与证据记录。'
      },
      {
        label: '度量',
        title: '度量价值，而非功能',
        text: '风险提前量、证据调取速度、报告工作量与决策周期缩短。'
      },
      {
        label: '产出',
        title: '有证据支撑的动作',
        text: '实际 vs 计划、延误成因、预测区间、缓解情景与批准记录。'
      }
    ],
    runEyebrow: '如何推进',
    runTitle: '十二周，四个检查点。',
    runCopy:
      '这里没有任何一项要等数据迁移先完成。如果第五周没有产出团队真正在用的东西，我们会直说。',
    weeks: [
      {
        range: '第 1–2 周',
        title: '范围与成功标准',
        text: '确定项目、我们想改进的那个决策，以及判断成败的指标。在动工之前先落成书面。'
      },
      {
        range: '第 3–5 周',
        title: '接入数据',
        text: '接入 IFC/BIM、基线进度、施工日志与证据记录。核对上报进度与有证据支撑的进度，把差值暴露出来。'
      },
      {
        range: '第 6–9 周',
        title: '智能进入工作流',
        text: '风险驱动因素、预测区间与 Ask Twin 在真实项目上下文中运行，由真实团队在真实的周例会周期中使用。'
      },
      {
        range: '第 10–12 周',
        title: '度量并决策',
        text: '如实对照成功标准汇报，并基于足以支撑任一结论的证据做出 go/no-go 决定。'
      }
    ],
    needEyebrow: '需要你提供什么',
    needTitle: '比你预想的要少。',
    needCopy: '一个需要先做一年数据治理才能产出任何东西的试点，不叫试点。',
    inputsLabel: '输入',
    inputs: 'IFC · 基线进度 · 施工日志 · RFI/NCR · 验收记录 · 现场照片',
    outputsLabel: '输出',
    outputs: '实际 vs 计划 · 延误成因 · 风险 · 预测 · 证据 · 缓解方案',
    startCta: '启动企业试点'
  },

  company: {
    meta: {
      title: '公司',
      description:
        'OneAI Construction 为资本项目构建智能层。为什么是建筑业、为什么是现在，以及我们不会让步的原则。'
    },
    eyebrow: '公司',
    h1: '为物理世界构建智能。',
    lede: 'OneAI Construction 是 OneAI Labs 旗下完全聚焦建筑与基础设施的产品——在这个行业，协同失效的代价最高，而且往往要到无法挽回时才被看见。',
    viewEyebrow: '我们的观点',
    viewTitle: '建筑业不需要又一个看板。',
    narrative: [
      '这个行业花了二十年把文档数字化，却仍然会被那些数周前就写在自己记录里的延误打个措手不及。问题从来不是数据不够，而是没有任何系统把项目当作一个完整对象来持有——几何、时间、证据与决策放在一起，连接得足够紧密以支撑推理。',
      '每个项目本身都已经包含了信号。一条到货记录发生变动，一次验收被推迟，一台塔吊被调走。这些事实都存在，只是散落在彼此从未打过照面的系统里；等它们汇聚成一份月度报告时，本可以消化它们的决策窗口已经关闭了。',
      '我们认为正确的应对是一个智能层：它理解项目上下文、留存证据、带着来源推理风险，并在明确的人类控制下协调行动。不是文档库上套一个聊天机器人，也不是又一个要求团队第四次录入同样数据的孤岛。'
    ],
    closingPrefix: '这就是这家公司的全部。两个产品——',
    closingMiddle: '与',
    closingAfterProducts: '——构建在同一个',
    worldModelLink: '项目世界模型',
    closingSuffix: '之上，一次一个项目地部署，对照我们在开始前就约定好的成功标准。',
    principlesEyebrow: '原则',
    principlesTitle: '我们不会让步的事。',
    principlesCopy: '这些原则约束着路线图。当一个功能诉求与其中之一冲突时，原则胜出。',
    principles: [
      {
        title: '先有证据，再有结论',
        text: '如果系统无法引用支撑某个结论的记录，它就不会给出这个结论。这是架构约束，而不是提示词里的一句叮嘱。'
      },
      {
        title: '责任始终在人',
        text: 'AI 提出建议。任何有后果的事都由具名的人批准，且批准会连同当时可见的证据一并记录。'
      },
      {
        title: '世界模型比模型活得更久',
        text: '基础模型会不断更迭。你项目的语义表征才是长期资产，所以我们让模型层保持可替换。'
      },
      {
        title: '集成，而非替换',
        text: '资本项目跑在那些确实好用的系统上。我们是它们之间的那一层，而不是一份把它们拆掉的提案。'
      },
      { title: '如实汇报', text: '试点的成功标准在开工前就落成书面。当标准没达到时，我们会直说。' },
      {
        title: '治理就是产品本身',
        text: '在决策可能多年后被翻出来审视的项目上，审计轨迹不是产品外围的合规负担，它就是客户真正在买的东西。'
      }
    ],
    finalCta: {
      eyebrow: '与我们合作',
      title: '带一个真实的问题来。',
      copy: '最有价值的第一次对话，是关于你在某个在建项目上正难以做出的决策——而不是一份功能清单。',
      primary: '预约演示',
      secondary: '阅读我们的思考'
    }
  },

  contact: {
    meta: {
      title: '预约企业演示',
      description:
        '与 OneAI Construction 团队聊聊项目数据、当前工作流、可量化的价值与切实可行的试点路径。从一个真实的项目问题开始最有效。'
    },
    eyebrow: '预约演示',
    h1: '带一个真实的项目问题来。',
    lede: '我们会把对话聚焦在你的项目数据、当前工作流、可量化的价值与切实可行的试点路径上——而不是一次功能巡礼。',
    points: ['企业演示', '试点范围界定', '技术架构', '集成方案讨论'],
    preferEmail: '更习惯邮件？',
    form: {
      name: '姓名',
      company: '公司',
      email: '工作邮箱',
      role: '职务（选填）',
      interest: '你想聊什么？',
      message: '项目 / 应用场景',
      messagePlaceholder: '哪个项目、目前在用哪些系统，以及当下最难做的决策是什么？',
      submit: '申请企业演示',
      submitting: '发送中…',
      note: '我们仅将你的信息用于回复本次请求。不发送订阅邮件，不转售。',
      honeypot: '网站',
      successTitle: '已收到你的请求。',
      successBodyPrefix:
        'OneAI Construction 团队会在一个工作日内回复。如果事情紧急，请直接邮件联系 ',
      networkError: '网络错误。请检查网络连接，或直接邮件联系我们。',
      genericError: '未能发送你的请求。',
      interests: {
        'enterprise-demo': '企业演示',
        pilot: '试点范围界定',
        'technical-architecture': '技术架构',
        partnership: '合作伙伴',
        other: '其他'
      }
    }
  },

  resources: {
    meta: {
      title: '洞察与资源',
      description:
        '关于建筑智能的技术与方法论写作：项目世界模型、概率工期预测、证据优先的检索，以及资本项目上的 AI 治理。'
    },
    eyebrow: '洞察',
    h1: '我们如何思考建筑智能。',
    lede: '方法论、架构与治理——写给那些需要为决策辩护的人，而不只是为软件签字的人。',
    readPrefix: '阅读 ·',
    minRead: '分钟',
    minReadSuffix: '分钟阅读',
    relatedEyebrow: '继续阅读',
    relatedTitle: '相关文章',
    notFound: '未找到'
  },

  integrations: {
    meta: {
      title: '集成',
      description:
        '与 Procore、Autodesk Construction Cloud、Primavera P6 的双向连接器，以及 SharePoint、Google Drive、Outlook、Gmail 与 ERP —— 支持增量同步与回写。'
    },
    eyebrow: '集成',
    h1: '接上你已经在用的系统。',
    lede: 'OneAI Construction 是一个智能层，而智能层只有在能读取团队今天真正在用的系统时才成立。在源平台允许的前提下，连接器是双向的，支持增量同步，并且会把结果回写，而不是让它们滞留在这里。',
    ctaPrimary: '聊聊你的技术栈',
    ctaSecondary: '了解平台',
    catalogEyebrow: '连接器目录',
    catalogTitle: '今天已经交付的部分。',
    catalogCopy:
      '每个连接器都声明了同步方向、供给的模块与流转的对象。本页没有任何一项是路线图内容。',
    headers: {
      connector: '连接器',
      auth: '认证',
      direction: '方向',
      modules: '供给模块'
    },
    categories: {
      project_controls: '项目管控',
      design: '设计与 BIM',
      schedule: '进度',
      documents: '文档',
      communications: '沟通',
      commercial: '商务'
    },
    directions: { import: '导入', export: '导出', bidirectional: '双向' },
    modules: {
      contracts: '合同',
      procurement: '采购',
      budget: '预算',
      schedule: '进度',
      qaqc: '质量',
      hse: 'HSE',
      field: '现场',
      documents: '文档',
      reports: '报告',
      approvals: '审批',
      costs: '成本'
    },
    formatsEyebrow: '进度文件格式',
    formatsTitle: '原生进度导入，不只是 CSV。',
    formatsCopy: '按计划工程师实际使用的格式接入，保留 WBS、活动、逻辑关系与基线。',
    formats: [
      { title: 'Primavera P6 XER', text: '原生 XER 导入，包含 WBS、活动、逻辑关系与基线。' },
      { title: 'MS Project XML', text: '面向以 Microsoft Project 为标准的团队的原生 XML 导入。' },
      { title: 'CSV', text: '为其他计划工具的导出、或快速启动首个试点提供的通用路径。' }
    ],
    syncEyebrow: '同步行为',
    syncTitle: '按小时跑也扛得住的设计。',
    syncItems: [
      {
        title: '增量同步',
        text: '连接器只搬运发生变化的部分，而不是每次运行都重新导入整个文档库。'
      },
      {
        title: '结果回写',
        text: '结果与发布的报告会回流到源系统，避免智能层变成工作成果的埋葬地。'
      },
      {
        title: '健康与错误',
        text: '每个连接器都记录最近一次同步、健康检查与错误，并在集成指挥中心呈现。'
      },
      {
        title: '受限凭据',
        text: '每个连接器独立的 OAuth 或 API Key，按引用存储，作用域限定在配置它的租户。'
      }
    ],
    apiEyebrow: '自行构建',
    apiTitle: '这一切之下是一套开放 API。',
    apiCopy:
      '两个产品都通过 HTTP 暴露完整能力面，配有 OpenAPI 3.0 文档、用于实时的 SSE 事件流，以及用于对外集成的 Webhook。如果某个连接器还不存在，API 并不是次一等的路径 —— 它就是连接器自己走的那条路。',
    apiItems: [
      { value: '143', label: 'Construction OS 的 API 端点数' },
      { value: '60+', label: 'Construction Twin 的 API 端点数' },
      { value: 'OpenAPI 3.0', label: '位于 /docs 的自助文档' },
      { value: 'SSE', label: '面向审批、任务与现场事件的实时流' }
    ]
  },

  notFound: {
    title: '页面未找到',
    lede: '你访问的页面不存在，或者已经迁移。',
    home: '返回首页',
    resources: '阅读我们的思考',
    code: '404'
  },

  apiErrors: {
    tooMany: '请求过于频繁。请稍后再试，或直接邮件联系我们。',
    malformed: '请求内容格式有误。',
    checkForm: '请检查表单内容。',
    undelivered: '我们未能送达你的请求。请直接邮件联系我们。',
    unexpected: '出了点问题。请直接邮件联系我们。'
  },

  validation: {
    name: '请填写你的姓名。',
    company: '请填写你的公司。',
    emailInvalid: '请填写有效的邮箱地址。',
    emailFree: '请使用你的工作邮箱。',
    message: '请简单说明项目或问题（20 个字符以上）。'
  }
} as const;
