import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import CategoryMenu from "./CategoryMenu";

function Menu({categories}) {
    return (
        <nav>
            <List>
                <div>
                   <Typography>
                       Super Shop
                   </Typography>
                </div>
                <Divider/>
                <CategoryMenu categories={categories} parentId={null} />
            </List>
        </nav>
    );
}

export default Menu;