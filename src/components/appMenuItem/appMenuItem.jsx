import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';

import appMenuItem from '../../types/appMenuItem';
import { ShowDynamicIcon } from './../../utils/helpers';

import useStyles from './styles';

const AppMenuItem = (props) => {
    const classes = useStyles();
    const { title, alias, Icon, items = [] } = props;
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open);
    }

    const MenuItemRoot = (
        <ListItem button className={classes.menuItem} onClick={handleClick}>
            {!!Icon && (
                <ListItemIcon className={classes.menuItemIcon}>
                    {/* allows to import Icons using component name stored in db */}
                    <ShowDynamicIcon icon={Icon} />
                </ListItemIcon>
            )}

            <ListItem
                button
                component={Link}
                to={props.staticMenu ? `${alias}` : `/category/${alias}`}
            >
                <ListItemText primary={title} inset={!Icon} />
            </ListItem>

            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}
        </ListItem>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />

            <List component="div" disablePadding>
                {console.log('items:', items)}
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

AppMenuItem.propTypes = {
    appMenuItem,
};

export default AppMenuItem;
