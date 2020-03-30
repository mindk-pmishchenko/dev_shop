import React from "react";
import {withRouter} from "react-router";
import PropTypes from 'prop-types';

import category from "../../types/category";

function Category({categories, match: {params}}) {
    const {alias} = params;
    const category = categories.find(({alias: categoryAlias}) => categoryAlias === alias);

    if (!category) {
        return '404';
    }

    return `#${category.id} - ${category.title}`;
}

Category.propTypes = {
    categories: PropTypes.arrayOf(category).isRequired,
};

export default withRouter(Category);