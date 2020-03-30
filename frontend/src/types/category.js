import PropTypes from 'prop-types'

const category = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string,
  parentId: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})

category.children = PropTypes.arrayOf(category)

export default category
