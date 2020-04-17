import * as yup from 'yup'

const LoginSchema = yup.object().shape({
  username: yup.string().required('Укажите имя!'),
  password: yup.string().required('Укажите пароль!')
})

export default LoginSchema
