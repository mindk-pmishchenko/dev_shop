import React from 'react'
import PropTypes from 'prop-types'

import Products from '../../containers/Products/Products'

const NewProducts = ({ setOpenCart }) => {
  const query = { order: ['createdAt desc'] }

  return <Products query={query} setOpenCart={setOpenCart} />
}

NewProducts.propTypes = {
  setOpenCart: PropTypes.func.isRequired
}

export default NewProducts
