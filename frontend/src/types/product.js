import PropTypes from 'prop-types'

const product = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string,
  properties: PropTypes.object,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})

export default product
