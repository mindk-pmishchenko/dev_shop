import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemLink({ primary, categiryId, ...other }) {
  return (
    <li>
      <ListItem
        button
        {...other}
        onClick={() => {
          console.log(`show cat ${categiryId}`);
        }}
      >
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
