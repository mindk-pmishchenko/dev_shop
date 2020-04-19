import * as yup from 'yup'

const RegisterSchema = yup.object().shape({
  username: yup.string().required('Укажите логин!').min(6, 'Не менее 6 символов!'),
  password: yup.string().required('Укажите пароль!').min(6, 'Не менее 6 символов!'),
  firstName: yup.string().required('Укажите имя!').min(2, 'Не менее 2 символов!'),
  lastName: yup.string().required('Укажите фамилию!').min(4, 'Не менее 4 символов!'),
  email: yup.string().required('Укажите email!').email('Укажите существующий email!'),
  address: yup.string().required('Укажите адрес!').min(10, 'Не менее 10 символов!'),
  mobilePhone: yup
    .string()
    .required('Укажите телефон!')
    .matches(/^[0-9]{12}$/, 'Номер телефона в формате 380993417144')
})

export default RegisterSchema
