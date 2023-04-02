import React, { useState, useEffect } from "react";
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
  Divider, Hidden
} from "@material-ui/core";
import UserList from "./UserList";
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';
import SearchFiles from "./SearchFiles"
import axios from "axios";
import { convertDateTime } from "../utils/index"
import { MdPermMedia } from "react-icons/md";
import Picker from "emoji-picker-react";
import MicIcon from '@material-ui/icons/Mic';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import DrowerFile from "../drower/DrowerFile"
import ChattingList from "./ChattingList"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
  },
  profileBox: {
    padding: "10px",
    background: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  paperBox: {
    minHeight: "100vh",
    maxHeight: "100vh",
    position: "relative",
    "& .bodyBox": {
      height: "65vh",
      overflowY: "overlay",
      padding: "15px",
      [theme.breakpoints.down("sm")]: {
        height: "45vh",
      },
      "& p": {
        color: "#606060",
      },
    },
    "& .footerBox": {
      padding: "15px",
      borderTop: "1px solid #f0f0f0",
      position: "absolute",
      bottom: "0",
      width: "100%",
      background: "#f0f2f5",
      "& .senButtonBox": {
        maxWidth: "85px",
        "& button": {
          width: "100%",
          height: "52px",
          border: "0",
        },
      },

      "& .linkBox": {
        position: "relative",
        textAlign: "center",
        "& input": {
          position: "absolute",
          width: "100%",
          left: 0,
          top: 0,
          opacity: 0,
          height: "100%",
        },
      },
    },

  },
  chattingList: {
    borderTop: "1px solid rgb(191 191 191 / 41%)",
    // overflowY: "scroll",
    padding: "5px 40px 10px 40px",
    overflowX: "hidden",
    maxHeight: "560px",
    minHeight: "560px",
    padding: "40px"
  },
  avtarImg: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: "50px",
      height: "50px",
    },
  },
  linkBox: {
    position: "relative",
    height: "100%",
    width: "30px",
    display: "inline-block",
    textAlign: "center",
    "& input": {
      position: "absolute",
      width: "100%",
      left: 0,
      top: 0,
      opacity: 0,
      height: "100%",
    },
  },
  userprofileBox: {
    maxWidth: "40px",
    "& img": {
      width: "100%"
    }
  },
  SearchBox: {
    marginTop: "10px",
  },
  Divider: {
    height: "5px"
  },
  userComponentBox: {
    height: "80vh",
    overflow: "scroll"
  },
  chatUserBox: {
    display: "flex",
    padding: "10px",
    background: "#f0f2f5",
    alignItems: "center",
    width: "100%",
    "& img": {
      borderRadius: "50px",
    },
    "& h5": {
      textAlign: "start",
      fontSize: "20px", fontWeight: "500",
      "& span": {
        fontSize: "14px",
        display: "flex",
      }
    }
  }, emojiBox: {
    position: "absolute",
    right: "25px",
    bottom: "80px"

  }
}));
const Chat = () => {
  const classes = useStyles();
  const [_userList, setUserList] = useState([])
  const [_userChatData, setUSerChat] = useState()
  const [_message, setMessageSend] = useState("")
  const [_searchuser, setSearchUSer] = useState("")
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessageSend((data) => data + event.emoji);
  };
  useEffect(() => {
    axios.get("/json/user.json").then(function (response) {
      setUserList(response?.data?.userList);
    });

  }, []);
  useEffect(() => {
    if (_searchuser?.length > 2) {
      axios.get("/json/Chat.json").then(function (response) {
        setUserList(response?.data)
      });
    }
  }, [_searchuser]);
  return (
    <Box className={classes.root}>
      {" "}
      <Grid container>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Paper elevation={2} className={classes.paperBox}>
            <Box className={classes.profileBox}>
              <Box className={classes.userprofileBox}>
                <img src="./userpic.png" />
              </Box>
              <IconButton className={classes.iconButton} aria-label="menu">
                <ChatIcon />
              </IconButton>
            </Box>
            <Divider className={classes.Divider} />
            <Box className={classes.profileBox} mt={2}>
              <SearchFiles setSearchUSer={setSearchUSer} _searchuser={_searchuser} />
            </Box>
            <Box className={classes.userComponentBox}>
              {_userList && _userList.map((data) => (

                <UserList data={data} setUSerChat={setUSerChat} />
              ))
              }
            </Box>
          </Paper>

        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          {_userChatData !== undefined && (
            <Paper elevation={2} className={classes.paperBox} style={{ background: "#e0e0d3" }}>
              <Box
                display="flex"
                alignItems="center"
              >
                <Box className={classes.chatUserBox} >
                  <Box className={classes.userprofileBox}>
                    <img src={_userChatData?.image} />
                  </Box>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Box>
                    <Typography variant='h5'>{_userChatData?.name} <br /><span>
                      {convertDateTime(_userChatData?.creationDate)}
                    </span>
                    </Typography>
                  </Box>

                </Box>
              </Box>

              <Box className={classes.chattingList}>
                <ChattingList

                />
              </Box>
              {showPicker && (
                <Box className={classes.emojiBox}>
                  <Picker onEmojiClick={onEmojiClick} />
                </Box>
              )}
              <form>
                <Box className="footerBox">
                  <Grid
                    container
                    style={{ alignItems: "center" }}
                  >
                    <Grid item xs={8} sm={10}>
                      <Box>
                        <TextField
                          variant="outlined"
                          fullWidth
                          placeholder="Type something here...."
                          onChange={(e) => setMessageSend(e.target.value)}
                          value={_message}
                          InputProps={{
                            endAdornment: (
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <IconButton>
                                  <Box className="linkBox">

                                    <MdPermMedia
                                      style={{ fontSize: "20px" }}
                                    />
                                    <input
                                      type="file"
                                      accept="image/*"

                                    />
                                  </Box>
                                </IconButton>
                                <IconButton>
                                  <MicIcon position="end"
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }} />
                                </IconButton>
                                <IconButton>
                                  <SentimentVerySatisfiedIcon
                                    position="end"
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      setShowPicker((val) => !val)
                                    }
                                  />
                                </IconButton>

                              </Box>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      {_message.length > 0 && (
                        <Box className="senButtonBox">
                          <Button
                            className={classes.sendButtonBox}
                            color="secondary"
                            variant="outlined"
                            onClick={() => { setMessageSend(""); setShowPicker(false) }}

                          >
                            <SendIcon />
                          </Button>
                        </Box>
                      )}

                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Paper>
          )}

        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
