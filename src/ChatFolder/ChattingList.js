import React, { useEffect, useRef, useState } from "react";
import {
    makeStyles,
    Grid,
    Box,
    Avatar,
    Typography,
    Tooltip,
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { toast } from "react-toastify";
import { convertDateTime } from "../utils/index";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    avtarImg: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
            width: "40px",
            height: "40px",
        },
    },
    textShow: {
        padding: "10px 15px",
        minWidth: "35%",
        position: "relative",
        borderRadius: "10px 10px 10px 0px",
        backgroundColor: "#fff",
        "& p": { textAlign: "start", "wordBreak": "break-all", "fontSize": "12px", "fontWeight": "600", "padding": "0 0 10px", color: "#000000a1" },
        "& span": { "right": "0", "color": "#00000057", "bottom": "0px", "position": "absolute", "fontSize": "10px", "padding": "0 10px" },
    },
    chatBox: {
        display: "flex",
        alignItems: "center"
    },
    MoreHorizIconIcon: {
        color: "#757575",
        cursor: "pointer",
        fontSize: "28px"
    }

}));
function ChattingList() {
    const classes = useStyles();
    const messageEl = useRef(null);

    const [listChat, setChatList] = useState([])
    console.log("listChat--->", listChat)

    useEffect(() => {
        axios.get("/json/Chat.json").then(function (response) {
            console.log("ddfsdffsd", response)

            setChatList(response?.data?.data?.chat1);
        });
    }, []);
    return (
        <Box>
            <Box ml={3}>
                <div className="message">
                    {listChat?.map((data, i) => {
                        console.log("data--->", data)
                        return (
                            <div key={i}>
                                <Grid container>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        {data?.from?.type === "user1" && <div id="left">
                                            <Box className={classes.chatBox}>


                                                <Box className={classes.textShow}>
                                                    <Typography>
                                                        {data.msg
                                                            .message} <br />
                                                        <span>
                                                            {convertDateTime("2021-01-23T02:36:09-08:00")}

                                                        </span>
                                                    </Typography>
                                                </Box>


                                                <Tooltip title="Copy">
                                                    <CopyToClipboard
                                                        text={data.msg
                                                            .message}
                                                    >
                                                        <MoreHorizIcon
                                                            className={classes.MoreHorizIconIcon}

                                                            onClick={() => toast.info("Copied")}
                                                        />
                                                    </CopyToClipboard>
                                                </Tooltip>
                                            </Box>
                                            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        </div>}

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>

                                        <div id="left">
                                            <Box className={classes.chatBox}
                                                style={{

                                                    marginTop: "50px",
                                                    justifyContent: "end"
                                                }}
                                            >
                                                <Tooltip title="Copy">
                                                    <CopyToClipboard
                                                        text={data.msg
                                                            .message}
                                                    >
                                                        <MoreHorizIcon

                                                            className={classes.MoreHorizIconIcon}

                                                            onClick={() => toast.info("Copied")}
                                                        />
                                                    </CopyToClipboard>
                                                </Tooltip>

                                                &nbsp;&nbsp;
                                                <Box className={classes.textShow}
                                                    style={{
                                                        background: "rgb(14 249 195 / 37%)"
                                                    }}>
                                                    <Typography>
                                                        {data.msg
                                                            .message} <br />
                                                        <span>
                                                            {convertDateTime("2021-01-23T02:36:09-08:00")}

                                                        </span>
                                                    </Typography>
                                                </Box>

                                            </Box>

                                        </div>

                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}
                    <div ref={messageEl} />
                </div>
            </Box>
        </Box>
    );
}

export default ChattingList;
