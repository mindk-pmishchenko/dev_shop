import PropTypes from 'prop-types'

const userSchema = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired
})

const user = PropTypes.oneOfType([PropTypes.exact({}), userSchema]).isRequired

export default user
