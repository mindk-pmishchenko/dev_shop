import React from 'react';
import List from '@material-ui/core/List';

import useStyles from './../appMenu/styles';
import AppMenuItem from './../appMenuItem';
import { genCategoriesMenuData } from './../../utils/helpers';

const AppMenu = ({ categories, staticMenu = false }) => {
  const classes = useStyles();
  const categoriesForRender = staticMenu
    ? categories
    : genCategoriesMenuData(categories, null);

  return (
    <List
      component="nav"
      className={classes.appMenu}
      disablePadding
    >
      {categoriesForRender.map((item, index) => (
        <AppMenuItem
          {...item}
          key={index}
          staticMenu={staticMenu}
        />
      ))}
    </List>
  );
};

export default AppMenu;
