import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import product from '../../../types/product'

const CartDetails = ({ products, handleDeleteProduct, setProductCount }) => {
  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название: </TableCell>
            <TableCell align="right">Цена: </TableCell>
            <TableCell align="right">Количество: </TableCell>
            <TableCell align="right">Сумма: </TableCell>
            <TableCell align="right">Удалить: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ id, name, price, quantity }) => {
            return (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={setProductCount(id)(-1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography component="span">{` ${quantity} `}</Typography>
                  <IconButton onClick={setProductCount(id)(+1)}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{price * quantity}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleDeleteProduct(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell rowSpan={1} />
            <TableCell colSpan={2} align="center">
              Итого:
            </TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

CartDetails.propTypes = {
  products: PropTypes.arrayOf(product).isRequired,
  handleDeleteProduct: PropTypes.func,
  setProductCount: PropTypes.func
}

export default CartDetails
