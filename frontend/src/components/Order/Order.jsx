import React from 'react'
import { useParams } from 'react-router-dom'

import useDataApi from '../../utils/hooks/useDataApi'
import Spinner from '../../components/Spinner/Spinner'
import TableProducts from './TableProducts/TableProducts'

const Order = () => {
  const { id } = useParams()

  const { rawData: orderRawData, isLoading: isOrderLoading, isError: isOrderError } = useDataApi({
    url: `/orders/${id}`,
    method: 'GET'
  })
  const order = orderRawData && !isOrderError ? orderRawData : {}
  const totalPrice = order.totalPrice ? Number(order.totalPrice) : 0
  const details = order.details ? order.details : []

  const productIds = details.map(({ productId }) => productId)
  const filter = JSON.stringify({ id: productIds })
  const { rawData: productsRawData, isLoading: isProductsLoading, isError: isProductsError } = useDataApi({
    url: `/products?filter=${filter}`,
    method: 'GET'
  })
  const products = productsRawData && !isProductsError ? productsRawData.results : []

  const isLoading = isOrderLoading || isProductsLoading

  return isLoading ? <Spinner /> : <TableProducts totalPrice={totalPrice} details={details} products={products} />
}

export default Order
