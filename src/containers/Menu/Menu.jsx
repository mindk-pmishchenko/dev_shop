import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';

import ListItemLink from '../../components/ListItemLink/ListItemLink';

function Menu({ categories }) {
  const [open, setOpen] = React.useState(false);

  const handleCategoriesClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  if (categories) {
    categories = categories.map(el => {
      return (
        <ListItemLink
          primary={el.title}
          key={el.id}
          categiryId={el.id}
          to={`/categories/${el.alias}`}
        />
      );
    });
  }

  return (
    <nav>
      <List>
        <div>
          <Typography>Super Shop</Typography>
        </div>
        <Divider />
        <ListItem button onClick={handleCategoriesClick}>
          <ListItemText primary="Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={open}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>{categories}</List>
        </Collapse>
      </List>
    </nav>
  );
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      alias: PropTypes.string.isRequired
    })
  )
};

export default Menu;
