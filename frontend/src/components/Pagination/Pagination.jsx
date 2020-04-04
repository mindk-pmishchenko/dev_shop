import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MPagination from '@material-ui/lab/Pagination'
import MPaginationItem from '@material-ui/lab/PaginationItem'
import { Link, Route, useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const Pagination = ({ pageCount, setPage }) => {
  const location = useLocation()
  const history = useHistory()

  const query = new URLSearchParams(useLocation().search)

  let page = Number(query.get('page')) || 1

  if (page <= 0) {
    history.replace(`${location.pathname}`)
    page = 1
  }
  if (page > pageCount) {
    history.replace(`${location.pathname}?page=${pageCount}`)
    page = pageCount
  }

  useEffect(() => setPage(page), [page, setPage])

  return (
    <Grid container justify="center">
      <Route>
        <MPagination
          variant="outlined"
          shape="rounded"
          page={page}
          count={pageCount}
          renderItem={item => (
            <MPaginationItem
              component={Link}
              to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Route>
    </Grid>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  setPage: PropTypes.func
}

export default Pagination
