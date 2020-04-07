import React from 'react';

function BasketProduct({ product }) {
  console.log('product from basket', product);
  console.log('product from basket: data: ', product[1]);

  return <>product[1].title</>;
}

export default BasketProduct;
