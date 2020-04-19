import format from 'date-fns/format'

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return format(date, 'dd-MM-yyyy HH:mm:ss')
}

export default formatDate
