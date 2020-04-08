import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

function BasketProduct({product, setProductCount, handleDeleteProduct}) {

    const [count, setCount] = useState(product.count);

    const onChangeCount = (event) => {
        setCount(event.target.value);
        setProductCount(product.id, event.target.value);
    };

    return (<>
        <Grid item xs={4}>
            <Typography>{product.title}</Typography>
        </Grid>
        <Grid item xs={3}>
            <Typography>{product.price}</Typography>
        </Grid>
        <Grid item xs={3}>
            <TextField id="outlined-basic"
                       label="Outlined"
                       type="number"
                       variant="outlined"
                       size="small"
                       inputProps={{ min: "1" }}
                       value={product.count}
                       onChange={onChangeCount}
            />
        </Grid>
        <Grid item xs={2}>
            <IconButton color="inherit" onClick={handleDeleteProduct(product.id)}>
                <Delete />
            </IconButton>
        </Grid>
    </>);
}

export default BasketProduct;