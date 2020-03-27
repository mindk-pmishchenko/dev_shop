import PropTypes from 'prop-types'

const categoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string,
  parentId: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})

export default categoryPropTypes
