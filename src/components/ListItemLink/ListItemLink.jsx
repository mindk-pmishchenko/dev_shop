import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const catClickHandler = id => {
  console.log(`cat clicked: ${id}`);
};

function ListItemLink({ primary, categiryId, ...other }) {
  return (
    <li>
      <ListItem
        button
        component={Link}
        {...other}
        onClick={() => catClickHandler(categiryId)}
      >
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default memo(ListItemLink);
