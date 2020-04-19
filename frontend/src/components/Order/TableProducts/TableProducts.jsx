import React from 'react'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'

import detail from '../../../types/detail'
import product from '../../../types/product'

const TableProducts = ({ totalPrice, details, products }) => (
  <Paper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small" align="center">
              #
            </TableCell>
            <TableCell align="center">Наименование товара: </TableCell>
            <TableCell align="right">Стоимость: </TableCell>
            <TableCell align="center">Количество: </TableCell>
            <TableCell align="right">Сумма: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map(({ id, quantity, sumPrice, productId }, index) => {
            const { name, price } = products.find(({ id }) => id === productId)

            return (
              <TableRow key={id}>
                <TableCell align="center">{++index}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{`${price} ₴`}</TableCell>
                <TableCell align="center">{quantity}</TableCell>
                <TableCell align="right">{`${sumPrice} ₴`}</TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell colSpan={4} align="right">
              Итого:{' '}
            </TableCell>
            <TableCell align="right">{totalPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)

TableProducts.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  details: PropTypes.arrayOf(detail).isRequired,
  products: PropTypes.arrayOf(product).isRequired
}

export default TableProducts
