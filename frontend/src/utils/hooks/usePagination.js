import { useState } from 'react'

const usePagination = ({ limit, categoryIds }) => {
  const [offset, setOffset] = useState(0)

  const filter = JSON.stringify({ limit, offset, relations: { categories: { id: categoryIds } } })

  const setPage = (page) => setOffset(page * limit - limit)

  return { filter, setPage }
}

export default usePagination
