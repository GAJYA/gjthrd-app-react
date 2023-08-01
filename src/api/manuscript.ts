import service from '@/utils/request'

export interface QueryDocumentParam {
  pageNo: Number
  pageSize: Number
  queryParams: {
    projectType?: Number | String
    status?: Number | String
    projectName?: String
    deptId?: Number | String
    sortKey?: String
    sortValue?: String
    projectRepo?: String
  }
}

export const queryDocument = (param: QueryDocumentParam) => {
  return service({
    url: '/project/queryDocument',
    method: 'post',
    data: param,
  })
}
