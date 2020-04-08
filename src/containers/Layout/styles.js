import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    app: {
        height: '100%',
        width: '100%'
    },
    menu: {
        height: '100%',
        width: '300px'
    },
    mainSection: {
        height: '100%',
        width: 'calc(100% - 300px)',
        padding: '20px',
        boxSizing:'border-box'
    }
}));

export default useStyles;