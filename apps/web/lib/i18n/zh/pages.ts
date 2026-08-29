export const pages = {
  products: {
    meta: {
      title: '产品',
      description:
        'Construction OS 组织项目工作、知识与智能体；Construction Twin 连接物理状态、时间、证据与预测。可单独使用，也可合并为同一个智能层。'
    },
    eyebrow: '产品',
    h1: '两个产品，一个项目智能层。',
    lede: 'Construction OS 组织工作与知识；Construction Twin 连接物理状态、时间、证据与预测。二者共享同一个项目世界模型，因此先用其中一个不会让你被困住。',
    chooseTitle: '选择与你项目需求匹配的那一层。',
    compare: {
      eyebrow: '如何区分',
      title: '从最痛的地方开始。',
      copy: '大多数团队先用其中一个，等它证明了价值之后再引入另一个。',
      caption: 'Construction OS 与 Construction Twin 能力对比',
      question: '你想回答的问题',
      os: 'Construction OS',
      twin: 'Construction Twin',
      primary: '核心能力',
      linked: '关联支持',
      partial: '部分支持',
      none: '—',
      rows: [
        '支撑这个判断的记录在哪里？',
        '项目此刻的物理状态是什么？',
        '这项活动为什么延误，成因是什么？',
        '我们实际会在什么时候完工，有多大把握？',
        '这是谁批准的，基于什么证据？',
        '这类反复出现的协调工作能自动化吗？'
      ]
    }
  },

  os: {
    meta: {
      title: 'Construction OS',
      description:
        '建筑智能的操作系统。连接文档智能、项目知识、受治理的工作流与施工智能体，无需替换团队正在使用的系统。'
    },
    eyebrow: 'CONSTRUCTION OS',
    h1: '建筑智能的操作系统。',
    lede: '连接项目知识、工作流与智能体，无需替换团队已经依赖的系统。',
    openProduct: '打开 Construction OS',
    capabilitiesEyebrow: '能力',
    capabilitiesTitle: '把项目协同变成结构化的智能。',
    capabilities: [
      {
        title: '文档智能',
        text: '连接图纸、施工方案、RFI、NCR 与验收记录，并具备版本意识——已作废的版本永远不会被当作现行版本引用。'
      },
      {
        title: '项目知识',
        text: '跨项目、跨人员、跨决策的持久上下文层，能够跨越移交与人员流动而留存。'
      },
      {
        title: '工作流自动化',
        text: '让任务、审批与后续动作在具备明确策略边界的受治理 AI 工作流中流转。'
      },
      {
        title: '施工智能体',
        text: '面向计划、质量安全、报告与项目管控的专用智能体，权限严格限定在其委托人范围内。'
      },
      {
        title: '人工批准',
        text: '需要担责的决策始终由人明确掌控，批准时可见的证据集会被完整记录。'
      },
      {
        title: '审计轨迹',
        text: '留存谁基于什么证据做了什么决定、之后发生了什么——可导出用于索赔与争议。'
      }
    ],
    worksWith: {
      eyebrow: '协同对接',
      title: '一个智能层，而不是又一个孤岛。',
      copy: 'Construction OS 从既有系统读取数据，并通过受治理的工作流回写。',
      inputs: ['协同数据环境 CDE', '文档管控', '现场报量', 'ERP / 商务'],
      brand: 'CONSTRUCTION OS',
      output: '受治理的行动'
    }
  },

  twin: {
    meta: {
      title: 'Construction Twin',
      description:
        '项目的活体 AI 表征。连接 IFC 几何、4D 进度、现场证据与概率预测，在空间、时间与上下文中理解项目。'
    },
    eyebrow: 'CONSTRUCTION TWIN',
    h1: '项目的活体 AI 表征。',
    lede: '连接几何、进度、证据与智能，在空间、时间与上下文中理解项目，并看清它正走向何处。',
    openProduct: '打开 Construction Twin',
    timeline: {
      eyebrow: '4D 项目智能',
      title: '看见。理解。预测。',
      copy: '对比基线、实际进度，以及基于核实后实际数据（而非上报数据）构建的预测区间。'
    },
    ask: {
      eyebrow: 'ASK TWIN',
      title: '有证据支撑的项目推理。',
      copy: '每个答案都由你可以打开的记录构成。证据缺失时，孪生会直接说明，而不是编出一句听起来合理的话。'
    },
    capabilitiesEyebrow: '能力',
    capabilitiesTitle: '孪生里装着什么。',
    capabilities: [
      { title: 'IFC / BIM 接入', text: '几何、空间层级与构件元数据都是一等公民实体。' },
      { title: '4D 进度关联', text: '活动与实体绑定，每个构件都带有基线、实际与预测状态。' },
      { title: '证据图谱', text: '施工日志、验收、到货与照片，与它们所描述的实体建立关联。' },
      { title: '风险智能', text: '量化敞口，并把驱动因素回溯到产生它们的原始记录。' },
      {
        title: '概率预测',
        text: '给出 P10 / P50 / P90 结果区间，而不是一个经不起追问的单一日期。'
      },
      { title: '情景仿真', text: '在做出承诺之前，把各种恢复方案作为带成本的预测曲线进行比较。' }
    ]
  },

  solutions: {
    meta: {
      title: '解决方案',
      description:
        '项目智能、进度智能、风险智能与施工智能体。从一个高价值决策切入，再随着证据与采用度的积累扩展智能层。'
    },
    eyebrow: '解决方案',
    h1: '围绕真正重要的项目决策构建智能。',
    lede: '从一个高价值问题切入，再随着证据与采用度增长扩展智能层。我们见过的每一次成功部署，都是从很窄的范围开始的。',
    sectionEyebrow: '核心领域',
    sectionTitle: '智能层能收回成本的六个场景。',
    items: [
      {
        title: '项目智能',
        text: '打通数据、证据与运营决策中的项目上下文，让同一个问题只有一个答案，而不是四个。'
      },
      {
        title: '进度智能',
        text: '解释偏差、识别背后的驱动因素，并在它进入进度报告之前暴露下游影响。'
      },
      {
        title: 'AI 数字孪生',
        text: '把项目实体与 4D 状态、现场证据和智能连接成一个可被追问的模型。'
      },
      { title: '风险智能', text: '量化并解释工期、资源与交付敞口，每个驱动因素都可追溯到源记录。' },
      {
        title: '施工智能体',
        text: '在策略、审批与审计之下协调可重复的工作——能力边界由设计约束，而非配置约束。'
      },
      { title: '高管简报', text: '把割裂的项目更新转化为经得起追问的、精炼的管理洞察。' }
    ]
  },

  platform: {
    meta: {
      title: '平台',
      description:
        '介于项目数据与行动之间的智能层。与模型无关、面向集成，围绕可解释性、治理与企业管控而设计。'
    },
    eyebrow: '平台',
    h1: '介于项目数据与行动之间的智能层。',
    lede: '与模型无关、面向集成，围绕可解释性、治理与企业管控而设计。',
    architecture: {
      eyebrow: '架构',
      title: '五个层次，一个项目对象。',
      copy: '项目世界模型才是长期资产。它之上的一切都是可替换的，它之下的一切都是你已经拥有的。'
    },
    foundationsEyebrow: '基础能力',
    foundationsTitle: '企业级基础。',
    foundations: [
      { title: '项目世界模型', text: '面向实体、活动、证据、风险与动作的统一语义层。' },
      { title: 'OneAI Forge', text: 'AI 模型的生命周期、评估、部署与治理基础设施。' },
      { title: '智能体运行时', text: '具备策略边界与强制人工审批关卡的工具型智能体。' },
      { title: '证据层', text: '把每一个结论回溯到源记录，并具备版本与权威性意识。' },
      { title: '开放集成', text: '连接 BIM、进度、文档、API 与外部企业平台。' },
      { title: '可观测性', text: '追踪系统健康度、AI 行为、审计事件与运行质量。' }
    ],
    deeper: {
      eyebrow: '深入了解',
      title: '为什么世界模型要放在最前面。',
      copy: '只有当你认同「建筑 AI 究竟在哪里失败」这一具体判断时，上面的架构才说得通。',
      worldModel: '阅读：项目世界模型 →',
      evidence: '阅读：证据优先的检索 →'
    }
  },

  industries: {
    meta: {
      title: '行业',
      description: '为接口复杂的资本项目而建：轨道交通、复杂房建、工业设施与大型基础设施项目群。'
    },
    eyebrow: '行业',
    h1: '为接口复杂的资本项目而建。',
    lede: '我们优先进入工期不确定性、证据碎片化与协调成本最高的场景——因为在那里，智能层改变的是结果，而不只是报告。',
    sectionEyebrow: '重点行业',
    sectionTitle: '我们从哪里开始。',
    items: [
      { title: '轨道交通', text: '车站、车辆段，以及接口责任常有争议的多标段轨道项目群。' },
      { title: '房建', text: '工序穿插密集的复杂公建、商业与超高层项目。' },
      { title: '工业厂房', text: '交付日期直接关联收入的工厂、数据中心与关键任务设施。' },
      { title: '基础设施', text: '处于公众监督之下的机场、桥梁、高速公路与重大市政工程。' }
    ]
  },

  enterprise: {
    meta: {
      title: '企业级',
      description:
        '内建治理的 AI：RBAC 与身份管理、人在环批准、完整可审计性、私有化部署与模型灵活性，面向资本项目组织。'
    },
    eyebrow: '企业级',
    h1: '治理内建的 AI。',
    lede: '为受控试点、企业级集成与人类担责的决策而设计——在这类项目上，每个重大决策最终都可能被翻出来审视。',
    securityLink: '安全与信任',
    controlsEyebrow: '管控能力',
    controlsTitle: '企业级管控。',
    controls: [
      {
        title: 'RBAC 与身份',
        text: '通过 SAML 与 OIDC 实现 SSO，支持 SCIM 供给，权限细化到项目、标段与记录类型。'
      },
      { title: '人在环', text: '任何有后果的 AI 建议动作都需明确批准，并连同其证据集一并记录。' },
      { title: '可审计性', text: '不可篡改的证据、推理、批准与结果轨迹——可导出用于索赔程序。' },
      {
        title: '私有化部署',
        text: '支持公有云、私有云与客户 VPC 部署，可选择区域以满足数据驻留要求。'
      },
      { title: '模型灵活性', text: '不锁定单一基础模型或供应商；受限数据可选择自托管模型。' },
      { title: '集成优先', text: '连接既有的 BIM、进度与项目管控系统，而不是替换它们。' }
    ],
    procurement: {
      eyebrow: '采购',
      title: '你的安全评审会先要什么。',
      copy: '与其等到第四次会议，我们更愿意在第一次会议上就交给你。',
      items: [
        {
          label: '文档',
          title: '安全材料包',
          text: '架构说明、DPA、次级处理方清单与渗透测试摘要，在 NDA 下提供。'
        },
        {
          label: '承诺',
          title: '写进合同，而非口头暗示',
          text: '不使用客户数据训练模型、区域选择与通知时限均为合同条款。'
        },
        {
          label: '合规状态',
          title: '现状如实说明',
          text: '我们会明确告诉你哪些已实现、哪些在推进中、哪些还在路线图上。'
        }
      ],
      seeSecurity: '查看安全与信任'
    }
  }
} as const;
