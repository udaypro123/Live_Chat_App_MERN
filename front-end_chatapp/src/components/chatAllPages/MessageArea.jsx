/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Height } from "@mui/icons-material";
import { Box, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

const MessageArea = ({ user }) => {


  return (
    <>
      <Grid container height={"8vh"} bgcolor={"#73a9ff"} borderRadius={1}>
        <Grid item xs={12} md={6} sm={6} borderRadius={1} display={"flex"}>
          <Grid item xs={6} sm={4} md={2} display="grid" justifyContent={"center"} alignItems={"center"} >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s"
              style={{ borderRadius: "50%", objectFit: "fill", height: "45px", width: "50px", border: "2px solid white", }}
              alt="User"
            />
          </Grid>
          <Grid item xs={6} sm={8} md={10} display="grid" alignItems={"center"}>
            {user?.fullname}
          </Grid>

        </Grid>
        <Grid item xs={12} md={6} sm={6} borderRadius={1} display="flex" justifyContent={"flex-end"} alignItems={"center"} >
          <Grid item width={"30%"} display="flex" justifyContent={"space-around"} alignItems={"center"}  >
            <CallTwoToneIcon  style={{ color: "#03174f", cursor: "pointer", fontSize:"30px" }} />
            <VideoCallTwoToneIcon style={{ color: "#03174f", cursor: "pointer", fontSize:"30px" }}/>
            <MoreVertTwoToneIcon style={{ color: "#03174f", cursor: "pointer" , fontSize:"30px"}}/>
          </Grid>
        </Grid>
      </Grid>


      <Grid height={"75vh"} bgcolor={"#c3d7f7"} borderRadius={2}>

      </Grid>

      <Grid height={"5vh"} bgcolor={"#73a9ff"} borderRadius={1} display={"flex"} >
        <Grid item xs={4} sm={2} md={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <AddToPhotosIcon style={{ color: "#03174f", cursor: "pointer" }} />
        </Grid>
        <Grid
          item
          xs={8}
          sm={10}
          md={11}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mr={3}
        >
          <textarea
            placeholder="typing here ...."
            style={{
              height: "100%",
              width: "100%",
              padding: "8px 20px",
              color: "white",
              backgroundColor: "#73a9ff",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "16px"
            }}
          />

          <SendIcon style={{ color: "#03174f", cursor: "pointer", fontSize: "25px" }} />
        </Grid>


      </Grid>
    </>
  );
};

export default MessageArea;

