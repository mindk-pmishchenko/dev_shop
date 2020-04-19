const setServerValidationErrors = (error, setError) => {
  const serverValidationErrors = error.response.data.error
  for (const field in serverValidationErrors) {
    setError(field, 'mustBeUnique', 'Такое значение уже используется')
  }
}

export default setServerValidationErrors
