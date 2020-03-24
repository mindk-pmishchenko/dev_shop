import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import useDataApi from '../../utils/hooks/useDataApi';
import { useEffect } from 'react';

import ListItemLink from '../../components/ListItemLink/ListItemLink';

let categories = [];

function Menu() {
  const config = {
    url: '/categories',
    method: 'GET',
    data: ''
  };

  const data = useDataApi(config);

  const [open, setOpen] = React.useState(false);

  const handleCategoriesClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  useEffect(() => {
    if (data.rawData) {
      //console.log('useEffect rawData:', data.rawData);

      categories = data.rawData.map(el => {
        return (
          <ListItemLink
            primary={el.title}
            key={el.id}
            categiryId={el.id}
          />
        );
      });
      //console.log('categories', categories);
    }
  }, [data]);

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

export default Menu;
