import PropTypes from 'prop-types'

const categoryShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string,
  parentId: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})

categoryShape.children = PropTypes.arrayOf(PropTypes.shape(categoryShape))
const categoriesPropTypes = PropTypes.arrayOf(categoryShape).isRequired

export default categoriesPropTypes
