const uniqueMessage = (field) => `${field} уже используется`

const formatErrors = (errors) => {
  const formattedErrors = {}
  for (const key in errors) {
    const errorType = errors[key][0].keyword
    switch (errorType) {
      case 'unique':
        formattedErrors[key] = { message: uniqueMessage(key) }
        break
      default:
        formattedErrors[key] = { message: 'Unknown error' }
    }
  }
  return formattedErrors
}

export default formatErrors
