import React from 'react';
import categoriesProp from '../../propTypes/categoriesProp'
import {useParams} from 'react-router-dom';

function CategoryPage({categories, isLoading}) {
    const {alias} = useParams();
    const category = categories.find(category => category.alias === alias);
    const component = isLoading ? 'Loading...' :
        category ? `${category.title} ${category.id}` : 'Category not found';
    return component;
}

CategoryPage.propTypes = {
    categories: categoriesProp
};

export default CategoryPage;