import type { AskTwinContent } from './types';

export const zh: AskTwinContent = {
  evidenceIndex: {
    'DR-241': {
      id: 'DR-241',
      type: 'Daily Report',
      date: '2026-08-15',
      source: '现场主管 · 屋面标段',
      excerpt:
        '塔吊因计划外检修于 07:00–15:20 不可用。屋面 B 区钢结构吊装停工；班组转至 C 区做准备作业。',
      weight: 'primary'
    },
    'DLV-CP23': {
      id: 'DLV-CP23',
      type: 'Delivery Record',
      date: '2026-08-16',
      source: '采购 · 钢结构分包',
      excerpt:
        '连接板批次 CP-23 部分到货（104 件中到 62 件）。余量改期至 2026-08-24。供应商称轧制环节延误。',
      weight: 'primary'
    },
    'ROOF-B-023': {
      id: 'ROOF-B-023',
      type: 'Schedule Activity',
      date: '2026-08-28',
      source: '基线 v12 · 第 34 周进度更新',
      excerpt:
        '计划工期 18 天，已用 22 天，完成 67%。总时差已耗尽。该活动现已进入关键线路；两项后续活动受影响。',
      weight: 'primary'
    },
    'NCR-0091': {
      id: 'NCR-0091',
      type: 'Non-Conformance',
      date: '2026-08-19',
      source: '质量检查员',
      excerpt:
        '6 处连接的螺栓扭矩值低于规范要求。已下达返工指令，复检已排期。预计对 B 区造成 1.5 天影响。',
      weight: 'supporting'
    },
    'BASE-V12': {
      id: 'BASE-V12',
      type: 'Baseline',
      date: '2026-03-02',
      source: '已批准的进度计划第 12 版',
      excerpt: '本答案中所有偏差均以此合同基线为准。屋面标段计划完成日期为 2026-10-14。',
      weight: 'supporting'
    },
    'PROG-W34': {
      id: 'PROG-W34',
      type: 'Progress Update',
      date: '2026-08-24',
      source: '计划工程师 · 第 34 周更新',
      excerpt: '屋面标段完成 71%，计划为 79%。围护结构相关活动已出现同类塔吊依赖约束的早期迹象。',
      weight: 'primary'
    },
    'RISK-0828': {
      id: 'RISK-0828',
      type: 'Risk Model Run',
      date: '2026-08-28',
      source: '蒙特卡洛 · 10,000 次迭代',
      excerpt:
        'P50 完工 2026-10-29（较基线 +15 天）。P90 为 2026-11-12（+29 天）。最大单一驱动因素：连接板到货周期（贡献 41% 的方差）。',
      weight: 'primary'
    },
    'SCEN-S04': {
      id: 'SCEN-S04',
      type: 'Recovery Scenario',
      date: '2026-08-28',
      source: '情景仿真 S-04',
      excerpt:
        '在 B 区完工前重排 C 区顺序，并锁定 6 个班次的专用塔吊资源。模型显示可挽回 14.7 天敞口中的 9.2 天。预估成本 4.8 万英镑。',
      weight: 'primary'
    },
    'RP-17': {
      id: 'RP-17',
      type: 'Resource Plan',
      date: '2026-08-26',
      source: '资源计划第 17 版',
      excerpt:
        '第二台汽车吊自 2026-09-02 起可用，最低起租 6 个班次。同一时间窗内未记录到冲突需求。',
      weight: 'supporting'
    }
  },

  answers: [
    {
      question: '屋面 B 区为什么延误？',
      summary:
        '屋面 B 区落后基线 4 天，且已耗尽全部时差。两个成因构成了大部分偏差，第三个正在继续叠加。',
      claims: [
        { text: '8 月 15 日塔吊不可用，损失了整整一个班次的钢结构吊装。', evidenceIds: ['DR-241'] },
        {
          text: '8 月 16 日连接板部分到货，班组缺口 42 件，余量要到 8 月 24 日才到。',
          evidenceIds: ['DLV-CP23']
        },
        { text: '6 处扭矩不足的连接返工，预计再增加 1.5 天。', evidenceIds: ['NCR-0091'] },
        {
          text: '该活动现已进入关键线路，两项后续活动暴露在风险中。',
          evidenceIds: ['ROOF-B-023', 'BASE-V12']
        }
      ],
      confidence: 89,
      confidenceBasis:
        '四条独立记录，其中三条为直接证据，且全部落在偏差发生的时间窗内。未发现相互矛盾的证据。',
      recommendation: '与项目总监一同评审缓解方案 S-04'
    },
    {
      question: '当前的工期风险有多大？',
      summary:
        '工期敞口集中在屋面钢结构与围护结构。若当前偏差持续，最可能的延误为 15 天，P90 情形为 29 天。',
      claims: [
        {
          text: 'P50 完工推至 10 月 29 日，比已批准的基线晚 15 天。',
          evidenceIds: ['RISK-0828', 'BASE-V12']
        },
        {
          text: '连接板到货周期是最大的单一驱动因素，贡献了 41% 的预测方差。',
          evidenceIds: ['RISK-0828', 'DLV-CP23']
        },
        { text: '围护结构活动已出现同类塔吊依赖约束的早期迹象。', evidenceIds: ['PROG-W34'] }
      ],
      confidence: 84,
      confidenceBasis:
        '模型运算是最新的（8 月 28 日），其驱动因素均可回溯到直接证据。置信度被压在 90 以下，是因为围护结构的敞口仅依赖单一份进度更新。',
      recommendation: '将连接板到货周期上报至采购评审',
      unsupported:
        '未发现任何将机电标段与此敞口关联起来的证据。任何关于下游机电受影响的说法目前都缺乏证据支撑。'
    },
    {
      question: '团队下一步该做什么？',
      summary:
        '有一个已建模的方案能以确定的成本挽回约三分之二的敞口。但它需要本周内做出决定才仍然可行。',
      claims: [
        {
          text: '重排 C 区顺序并锁定 6 个专用塔吊班次，可挽回 14.7 天敞口中的 9.2 天，预估成本 4.8 万英镑。',
          evidenceIds: ['SCEN-S04']
        },
        { text: '第二台汽车吊自 9 月 2 日起可用，且未记录到竞争性需求。', evidenceIds: ['RP-17'] }
      ],
      confidence: 81,
      confidenceBasis:
        '方案是基于当前项目状态建模的，但塔吊可用性是单一来源的说法，且该时间窗在 9 月 2 日关闭。',
      recommendation: '发布缓解计划前需人工批准'
    }
  ]
};
