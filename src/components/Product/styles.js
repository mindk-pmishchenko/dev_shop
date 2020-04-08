import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        maxWidth: '350px',
        minWidth: '200px',
        marginBottom: '20px',
        marginRight: '20px'
    },
    title: {
        fontSize:'16px',
        marginBottom: '16px'
    }
});
