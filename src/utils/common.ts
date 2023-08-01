export interface IListItem {
  id: number | string
  name: string
}

export function getNameByIdFromList(findId: number, list: IListItem[]) {
  const obj = list.find((item) => item.id === findId)
  if (!obj) return ''
  return obj.name
}

function fixDate(val: number) {
  return val < 10 ? `0${val}` : val
}

// 时间转换
export function formatTime(time: string | number | Date, type?: string) {
  let result = ''
  if (time) {
    const value = new Date(time)
    const year = value.getFullYear()
    const month = fixDate(value.getMonth() + 1)
    const day = fixDate(value.getDate())
    const hour = fixDate(value.getHours())
    const minutes = fixDate(value.getMinutes())
    const seconds = fixDate(value.getSeconds())
    const weekShow = ['日', '一', '二', '三', '四', '五', '六']
    const week = value.getDay()
    switch (type) {
      case 'DATE':
        result = `${year}-${month}-${day}`
        break
      case 'DATE-CN':
        result = `${year}年${month}月${day}日`
        break
      case 'MONTH':
        result = `${year}-${month}`
        break
      case 'TIME':
        result = `${year}-${month}-${day} ${hour}:${minutes}`
        break
      case 'WEEK':
        result = `${year}-${month}-${day} 星期${weekShow[week]} ${hour}:${minutes}`
        break
      case 'YEAR':
        result = `${year}`
        break
      default:
        result = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    }
  }
  return result
}
