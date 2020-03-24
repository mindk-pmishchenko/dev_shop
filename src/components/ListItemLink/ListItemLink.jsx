import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemLink({primary, ...other}) {

    return (
        <li>
            <ListItem button {...other}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export default ListItemLink;