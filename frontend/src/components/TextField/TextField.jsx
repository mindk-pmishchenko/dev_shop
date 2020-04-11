import React from 'react'
import MTextField from '@material-ui/core/TextField'

const TextField = (props) => {
  const {
    label,
    input,
    meta: { error, invalid, touched },
    ...custom
  } = props

  return (
    <MTextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )
}

export default TextField
