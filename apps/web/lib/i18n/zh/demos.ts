export const demos = {
  twin: {
    topbar: '02 号车站 / 项目孪生',
    live: '实时',
    sceneLabel: '02 号车站的交互式三维模型。拖动可旋转，也可使用下方的分区按钮。',
    rotateLeft: '向左旋转模型',
    rotateRight: '向右旋转模型',
    pause: '暂停',
    rotate: '旋转',
    hint: '拖动以环绕查看',
    selectedEntity: '选中实体',
    selectZone: '选择分区',
    status: '状态',
    progress: '完成度',
    variance: '偏差',
    risk: '风险',
    evidence: '证据',
    askTwin: '向孪生提问 →',
    statusLabels: {
      complete: '已完成',
      active: '进行中',
      delayed: '已延误',
      planned: '计划中'
    },
    riskLabels: { low: '低', medium: '中', high: '高' },
    zones: {
      A: { name: '屋面 A 区', activity: 'ROOF-A-018 · 钢结构吊装' },
      B: { name: '屋面 B 区', activity: 'ROOF-B-023 · 连接板安装' },
      C: { name: '站厅 C 区', activity: 'CONC-C-041 · 楼板浇筑顺序' },
      D: { name: '站台 D 区', activity: 'PLAT-D-007 · 道床基层处理' }
    }
  },

  ask: {
    label: 'ASK TWIN',
    confidence: '置信度',
    questionsLabel: '示例问题',
    note: '下面每一条结论都由原始记录构成，而不是检索到的文本片段。点开任意一条即可查看来源。',
    notSupported: '证据不支持：',
    whyConfidence: '置信度依据：',
    recommendedAction: '建议动作',
    weightPrimary: '直接证据',
    weightSupporting: '佐证',
    provisionalBadge: '暂定',
    provenance: '来源',
    modelBacked: '模型生成',
    localReasoner: '本地推理器',
    retrievalLabel: '检索方式',
    sampleLabel: '进度样本',
    activities: '条活动',
    noEvidence: '无匹配记录',
    provenanceNote: '产品在每个答案上都会报告这些字段。本演示展示的是同样的字段。',
    evidenceLabel: '证据',
    liveBasis: '基于演示项目实时作答，检索到 {count} 条记录。',
    evidenceTypes: {
      'Daily Report': '施工日志',
      'Delivery Record': '到货记录',
      'Schedule Activity': '进度活动',
      'Non-Conformance': '不符合项',
      Baseline: '基线',
      'Progress Update': '进度更新',
      'Risk Model Run': '风险模型运算',
      'Recovery Scenario': '恢复情景',
      'Resource Plan': '资源计划'
    }
  },

  live: {
    badge: '实时',
    badgeTitle: '由运行中的产品回答，而非预设脚本',
    staticBadge: '示例',
    staticTitle: '代表性数据。当前无法连接实时演示端点。',
    loading: '正在向项目提问…',
    forecastTitle: '来自演示项目的实时数据',
    forecastCaption: '当前 P10/P50/P90 延误天数，由运行中的产品在已播种的演示项目上计算得出。',
    calibrated: '已校准',
    uncalibrated: '未校准',
    sample: '样本',
    illustrative: '交互式示意 —— 拖动数据日期，观察预测区间如何变化。',
    p10: 'P10',
    p50: 'P50',
    p90: 'P90',
    days: '天'
  },
  timeline: {
    eyebrow: '4D 项目智能',
    title: '基线 · 实际 · 预测区间',
    dataDate: '数据日期 · 第',
    sliderLabel: '数据日期，自项目开始的天数',
    legend: {
      baseline: '基线',
      actual: '实际',
      p50: 'P50 预测',
      cone: 'P10–P90 区间'
    },
    stats: {
      planned: '计划完成度',
      actual: '实际完成度',
      p50Variance: 'P50 偏差',
      p90Variance: 'P90 偏差',
      p10Best: 'P10（最优情形）',
      day: '第'
    },
    chartLabel:
      '数据日期为第 {dataDate} 天的进度 S 曲线。计划完成 {planned}%，实际完成 {actual}%。预测完工：P50 第 {p50} 天，P90 第 {p90} 天，基线为第 {baseline} 天。',
    beyondHorizon: '超出预测范围'
  },

  architecture: {
    layers: [
      { name: '应用层', items: 'Construction OS · Construction Twin' },
      { name: '智能层', items: '智能体 · 检索 · 风险 · 预测 · 仿真' },
      { name: '项目世界模型', items: '实体 · 活动 · 证据 · 风险 · 动作' },
      { name: 'AI 基础设施', items: 'OneAI Forge · 模型路由 · 评估 · 治理' },
      { name: '项目数据', items: 'IFC/BIM · P6 · 文档 · 照片 · API' }
    ]
  }
} as const;
