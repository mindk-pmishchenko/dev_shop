import React from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import category from '../../../types/category';
import './categoryPage.css';

const CategoryPage = ({ categories }) => {
  let { alias } = useParams();
  let currentCat;
  if (categories) {
    currentCat = categories.filter(el => {
      return el.alias === alias;
    });
    if (!currentCat[0]) {
      return <>Smth went wrong</>;
    }
    const { id, title } = currentCat[0];

    return (
      <>
        <div>Category Page</div>
        <ul>
          <li>Cat Title: {title} </li>
          <li>Cat id: {id} </li>
        </ul>
      </>
    );
  }
  return <div>loading...</div>;
};

CategoryPage.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired
};

export default CategoryPage;
