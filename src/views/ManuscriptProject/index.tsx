import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { queryDocument } from '@/api/manuscript'
import belongSRBList from '@/utils/areaList'
import { projectTypeDataList, projectTypeDetailDataList } from '@/utils/enum'
import { getNameByIdFromList, formatTime } from '@/utils/common'

interface DataType {
  id: number
  projectName: string
  projectCode: string
  customerName: string
  companyBrief: string
  projectType: number
  projectTypeDetail: number
  deptName: string
  creator: string
  createDate: number
  updateDate: number
  industry: string
  belongSRB: string
}

function viewDetail(record: DataType) {
  console.log(record)
}

const columns: ColumnsType<DataType> = [
  {
    title: '操作',
    key: 'operation',
    fixed: 'left',
    width: 80,
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" size="small" onClick={() => viewDetail(record)}>
          查看
        </Button>
      </Space>
    ),
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    fixed: 'left',
    width: 160,
    ellipsis: {
      showTitle: false,
    },
    render: (projectName) => (
      <Tooltip placement="topLeft" title={projectName}>
        {projectName}
      </Tooltip>
    ),
  },
  {
    title: '项目编号',
    dataIndex: 'projectCode',
    ellipsis: true,
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    ellipsis: true,
  },
  {
    title: '客户简称',
    dataIndex: 'companyBrief',
  },
  {
    title: '项目类型',
    ellipsis: true,
    dataIndex: 'projectType',
    render: (projectType) => getNameByIdFromList(projectType, projectTypeDataList),
  },
  {
    title: '项目细分类型',
    dataIndex: 'projectTypeDetail',
    width: 130,
    ellipsis: true,
    render: (_, { projectType, projectTypeDetail }) =>
      getNameByIdFromList(projectTypeDetail, projectTypeDetailDataList[projectType]),
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 200,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    ellipsis: true,
    render: (createDate) => formatTime(createDate),
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate',
    ellipsis: true,
    render: (updateDate) => formatTime(updateDate),
  },
  {
    title: '行业',
    dataIndex: 'industry',
    ellipsis: true,
  },
  {
    title: '所属辖区',
    dataIndex: 'belongSRB',
    render: (belongSRB) => <Tag color="blue">{getNameByIdFromList(belongSRB, belongSRBList)}</Tag>,
  },
]

export default function ManuscriptPtoject() {
  const [tableData, setTableData] = useState<DataType[]>([])

  useEffect(() => {
    const param = {
      pageNo: 1,
      pageSize: 20,
      queryParams: {
        projectType: '',
        status: '',
        projectName: '',
        deptId: '',
        sortKey: '',
        sortValue: '',
        projectRepo: '',
      },
    }
    queryDocument(param)
      .then((response) => {
        const { data = {} } = response.data
        setTableData(data.items || [])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <Table
      style={{ width: '100%', height: '80%' }}
      columns={columns}
      loading={tableData.length === 0}
      expandable={{
        // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.projectName}</p>,
        rowExpandable: (record) => record.projectName !== 'Not Expandable',
      }}
      pagination={{ pageSize: 20 }}
      scroll={{ x: 'max-content', y: 500 }}
      dataSource={tableData}
    />
  )
}
