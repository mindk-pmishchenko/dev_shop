import PropTypes from 'prop-types'

import categoryPropTypes from './categoryPropTypes'

categoryPropTypes.children = PropTypes.arrayOf(PropTypes.shape(categoryPropTypes))
const categoriesPropTypes = PropTypes.arrayOf(categoryPropTypes).isRequired

export default categoriesPropTypes
