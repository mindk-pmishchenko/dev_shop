import * as yup from 'yup'

const UserSchema = yup.object().shape({
  firstName: yup.string().required('Укажите имя!'),
  lastName: yup.string().required('Укажите фамилию!'),
  address: yup.string().required('Укажите адрес!'),
  email: yup.string().required('Укажите email!').email('Укажите существующий email!'),
  mobilePhone: yup.string().required('Укажите мобильный телефон!')
})

export default UserSchema
