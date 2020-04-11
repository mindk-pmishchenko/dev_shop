import PropTypes from 'prop-types'

const user = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  address: PropTypes.string,
  email: PropTypes.string,
  mobilePhone: PropTypes.string
})

export default user
