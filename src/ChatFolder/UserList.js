import React from 'react'
import {
    makeStyles,
    Grid,
    Box,
    Paper,
    TextField,
    Avatar,
    Typography,
    Button,
    IconButton,
    Modal,
    Fade,
    Backdrop,
    Divider,
    useTheme,
    Tooltip,
    Container,
} from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { convertDateTime } from "../utils/index"
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "15px",
        display: "flex", justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
            background: "#f0f2f5"
        },
        "& h5": {
            fontSize: "20px", fontWeight: "500",
            "& span": {
                fontSize: "14px",
                display: "flex",

                "& svg": {
                    fontSize: "18px", color: "grey"
                }
            }
        },
        "& h6": {
            fontSize: "14px",
            fontWeight: "300",
            position: "relative",
            "& span": {
                background: "#8080801f",
                padding: "3px 10px",
                borderRadius: "50px",
                position: "absolute",
                right: "0",
            }
        }
    },
    userprofileBox: {
        maxWidth: "50px",
        "& img": {
            width: "100%",
            borderRadius: "100px"
        }
    },
    profileBox: {
        display: "flex"
    }
}));
const UserList = ({ data, setUSerChat }) => {
    const classes = useStyles();
    console.log("datadd--->", data)
    return (
        <Box className={classes.root} onClick={() => setUSerChat(data)}>
            <Box className={classes.profileBox} >
                <Box className={classes.userprofileBox}>
                    <img src={data?.image} />
                </Box> &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant='h5'>{data?.name} <br /><span>
                    <DoneAllIcon />
                    {data?.surname}
                </span>
                </Typography>
            </Box>
            <Box>
                <Typography variant='h6'>
                    {convertDateTime(data?.creationDate)} <br />

                    <span>
                        {data?.id}

                    </span>
                </Typography>
            </Box>
        </Box>
    )
}

export default UserList
