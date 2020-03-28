import PropTypes from 'prop-types'

import categoryPropTypes from './categoryPropTypes'

const categoriesPropTypes = PropTypes.arrayOf(categoryPropTypes).isRequired

export default categoriesPropTypes
