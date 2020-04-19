import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import { useHistory } from 'react-router-dom'

import Spinner from '../../components/Spinner/Spinner'
import useDataApi from '../../utils/hooks/useDataApi'
import { formatDate } from '../../utils/helper'
import useStyles from './styles'

const Orders = () => {
  const history = useHistory()

  const filter = JSON.stringify({ limit: 1000 })
  const { rawData, isLoading, isError } = useDataApi({ url: `/orders?filter=${filter}`, method: 'GET' })
  const orders = rawData && !isError ? rawData.results : []

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const labelDisplayedRows = ({ from, to, count }) =>
    `${from} - ${to === -1 ? count : to} c ${count !== -1 ? count : '>' + to}`

  const handleClick = (id) => () => history.push(`/orders/${id}`)

  const classes = useStyles()

  return isLoading ? (
    <Spinner />
  ) : (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center">
                #
              </TableCell>
              <TableCell align="center">Номер заказа: </TableCell>
              <TableCell align="center">Дата создания: </TableCell>
              <TableCell align="right">Общая сумма: </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, createdAt, totalPrice }, index) => (
                <TableRow key={id} onClick={handleClick(id)} className={classes.row}>
                  <TableCell size="small" align="center">
                    {++index}
                  </TableCell>
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="center">{formatDate(createdAt)}</TableCell>
                  <TableCell align="right">{`${totalPrice} ₴`}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Заказов на страницу:"
        labelDisplayedRows={labelDisplayedRows}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Orders
