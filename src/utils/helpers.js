import React from 'react';
import IconDashboard from '@material-ui/icons/Dashboard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconShoppingCart from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import IconPeople from '@material-ui/icons/People';
import IconBarChart from '@material-ui/icons/BarChart';
import LabelIcon from '@material-ui/icons/Label';
import Divider from '@material-ui/core/Divider';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const ShowDynamicIcon = ({ icon }) => {
  switch (icon) {
    case 'IconPeople':
      return <IconPeople />;
    case 'IconDashboard':
      return <IconDashboard />;
    case 'LocalShippingIcon':
      return <LocalShippingIcon />;
    case 'CategoryIcon':
      return <CategoryIcon />;
    case 'DragIndicatorIcon':
      return <DragIndicatorIcon />;
    case 'MoreHorizIcon':
      return <MoreHorizIcon />;
    case 'LabelIcon':
      return <LabelIcon />;
    case 'IconShoppingCart':
      return <IconShoppingCart />;
    case 'IconBarChart':
      return <IconBarChart />;
    case 'Divider':
      return <Divider />;

    default:
      return false;
  }
};

//use api get_categories reply and generate an array for appMenu, allows to make nesting
const genCategoriesMenuData = (data, root) => {
  var t = {};
  data.forEach(({ parent_id, ...o }) => {
    Object.assign((t[o.id] = t[o.id] || {}), o);
    t[parent_id] = t[parent_id] || {};
    t[parent_id].items = t[parent_id].items || [];
    t[parent_id].items.push(t[o.id]);
  });
  return t[root].items;
};

export { ShowDynamicIcon, genCategoriesMenuData };
