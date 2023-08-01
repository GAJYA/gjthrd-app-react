import constant from './constant'

// 项目类型：abs人员只显示ABS类型，非ABS人员展示所有
export const projectTypeDataList = [
  {
    id: constant.PROJECTTYPEISIPO,
    name: 'IPO及北交所上市',
  },
  {
    id: constant.PROJECTTYPEISREFINANCING,
    name: '再融资（保荐）',
  },
  {
    id: constant.PROJECTTYPEISBOND,
    name: '债券',
  },
  {
    id: constant.PROJECTISMERGEREORGA,
    name: '上市公司并购重组',
  },
  {
    id: constant.PROJECTISNEWTHIRDBOARD,
    name: '新三板',
  },
  {
    id: constant.PROJECTTYPEISABS,
    name: 'ABS（资管）',
  },
  {
    id: constant.PROJECTTYPEISOTHERFINANCIAL,
    name: '其他财务顾问',
  },
  {
    id: constant.PROJECTTYPEISINVESTMENT,
    name: '投行引荐类（跨体系合作）',
  },
]

/**
 * 项目细分类型
 * key：为了下拉显示使用，选中后显示name值
 * 102.新三板转IPO：新建项目不让选，已废弃 */
export const projectTypeDetailDataList = {
  [constant.PROJECTTYPEISIPO]: [
    {
      id: 101,
      name: 'IPO',
    },
    {
      id: 102,
      name: '新三板转IPO',
      key: '新三板转IPO（包括曾经/目前挂牌）',
      noVisible: true,
    },
    {
      id: 103,
      name: '北交所上市',
    },
    {
      id: 105,
      name: 'IPO分销',
    },
    {
      id: 106,
      name: '转板上市',
    },
    {
      id: 107,
      name: '重新上市',
    },
    {
      id: 108,
      name: 'IPO其他（需内核会）',
    },
  ],
  [constant.PROJECTTYPEISREFINANCING]: [
    {
      id: 111,
      name: '可转债',
      noVisible: true,
    },
    {
      id: 112,
      name: '非公开发行股票',
      noVisible: true,
    },
    {
      id: 113,
      name: '增发',
    },
    {
      id: 114,
      name: '配股',
    },
    {
      id: 117,
      name: '可转债（特定对象）',
    },
    {
      id: 118,
      name: '可转债（不特定对象）',
    },
    {
      id: 119,
      name: '向特定对象发行股票',
    },
    {
      id: 251,
      name: '向特定对象发行股票（简易）',
    },
    {
      id: 252,
      name: '再融资联主',
    },
    {
      id: 115,
      name: '再融资分销',
    },
    {
      id: 253,
      name: '再融资其他（需内核会）',
    },
    {
      id: 116,
      name: '再融资其他（无需内核会）',
    },
  ],
  [constant.PROJECTTYPEISBOND]: [
    {
      id: 121,
      name: '公司债（主承）',
    },
    {
      id: 122,
      name: '企业债（主承）',
    },
    {
      id: 124,
      name: '北金所债权融资计划（副主）',
    },
    {
      id: 123,
      name: '银行间产品（分销）',
    },
    {
      id: 128,
      name: '其他债券分销（含债券副主及分销、债权融资计划分销、销售顾问、无尽调责任的财务顾问）',
    },
    {
      id: 125,
      name: '债券回售',
    },
    {
      id: 127,
      name: '债券转售',
    },
    {
      id: 126,
      name: '债券其他',
    },
  ],
  [constant.PROJECTISMERGEREORGA]: [
    {
      id: 141,
      name: '上市公司收购',
    },
    {
      id: 142,
      name: '上市公司股份权益变动',
    },
    {
      id: 143,
      name: '发行股份购买资产',
    },
    {
      id: 144,
      name: '上市公司重组上市（涉及配融）',
    },
    {
      id: 145,
      name: '上市公司重组上市（不涉及配融）',
    },
    {
      id: 146,
      name: '上市公司重大资产重组（不涉及发行股份）',
    },
    {
      id: 147,
      name: '上市公司资产重组（未构成重大/不涉及发行股份）',
    },
    {
      id: 148,
      name: '上市公司股份回购',
    },
    {
      id: 149,
      name: '上市公司股权激励',
    },
    {
      id: 150,
      name: '仅担任承销商的重组配融项目',
    },
    {
      id: 151,
      name: '并购重组其他',
      key: '涉及上市公司的其他财务顾问',
    },
  ],
  [constant.PROJECTISNEWTHIRDBOARD]: [
    {
      id: 161,
      name: '推荐挂牌',
    },
    {
      id: 162,
      name: '承接持续督导',
    },
    {
      id: 163,
      name: '定向发行',
    },
    {
      id: 164,
      name: '重大资产重组',
    },
    {
      id: 165,
      name: '非上市公众公司收购',
    },
    {
      id: 166,
      name: '非公开发行优先股',
    },
    {
      id: 167,
      name: '新三板其他',
    },
  ],
  [constant.PROJECTTYPEISABS]: [
    {
      id: 181,
      name: 'ABS（资管）',
    },
  ],
  [constant.PROJECTTYPEISOTHERFINANCIAL]: [
    {
      id: 201,
      name: '财务顾问其他',
      key: '其他（非上市公司尽职调查、出具相关意见等）',
    },
    {
      id: 202,
      name: 'IPO前期规范',
    },
    {
      id: 203,
      name: '融资',
      key: '融资（非上市公司引进投资、股权激励等）',
    },
    {
      id: 204,
      name: '收购',
      key: '收购（收购双方均非上市公司）',
    },
  ],
  [constant.PROJECTTYPEISINVESTMENT]: [
    {
      id: 221,
      name: '资产证券',
    },
    {
      id: 222,
      name: '股权质押',
    },
    {
      id: 224,
      name: '境外债',
    },
    {
      id: 223,
      name: '其他',
    },
  ],
}
