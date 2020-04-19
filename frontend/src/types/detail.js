import PropTypes from 'prop-types'

const detail = PropTypes.shape({
  id: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  sumPrice: PropTypes.string.isRequired
})

export default detail
