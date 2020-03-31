import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

import ListItemLink from "../../components/ListItemLink/ListItemLink";

function CategoryMenu({categories, parentId}) {
    const [open, setOpen] = React.useState(false);

    const handleCategoriesClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const categoriesArray =  categories.filter(({parent_id: categoryParentId}) => categoryParentId === parentId);

    return (
        <>
            <ListItem button onClick={handleCategoriesClick}>
                <ListItemText primary="Categories"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                <List disablePadding>{categoriesArray.map(({id, title, alias}) =>
                    <>
                        <ListItemLink key={id} primary={title} to={`/category/${alias}`} />
                        <CategoryMenu categories={categories} parentId={id} />
                    </>
                )}</List>
            </Collapse>
        </>
    );
}

export default CategoryMenu;