import React from 'react';
import {useParams} from 'react-router-dom';

function CategoryPage({categories}) {
    const {alias} = useParams();
    const category = categories.find(category => category.alias === alias);

    return `${category.title} ${category.id}`;
}

export default CategoryPage;