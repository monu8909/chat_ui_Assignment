import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Search } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: " 100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function CustomizedInputBase({ setSearchUSer, _searchuser }) {
    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
            <Search />
            <InputBase
                className={classes.input}
                placeholder="Search User"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={_searchuser}
                onChange={(e) => setSearchUSer(e.target.value)}
            />

            <Divider className={classes.divider} orientation="vertical" />

        </Paper>
    );
}
