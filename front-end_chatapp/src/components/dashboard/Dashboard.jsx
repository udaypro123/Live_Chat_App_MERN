/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = React.lazy(() => import("../header/NavBar"));
const UserList = React.lazy(() => import("../chatAllPages/UserList"));
const MessageArea = React.lazy(() => import("../chatAllPages/MessageArea"));

const Dashboard = () => {

  const userdata =useSelector((state)=>state.user)
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("userdata", userdata)
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Box height={"100vh"} width={"100vw"} >
      {/* <Box height={"100vh"} width={"100vw"} bgcolor={"#021b42"}> */}
        <Grid item xs={12} sm={12} md={12}>
          <Navbar />
        </Grid>
        <Grid container mt={2} display="flex" height={"90%"} width={"100%"} margin={"auto"} justifyContent={"space-around"}>
          <Grid item mt={2} xs={5.5} width={"40%"} sm={3} md={3} bgcolor={"#c3d7f7"}>
            <UserList onSelectUser={handleUserSelect} />
          </Grid>
          <Grid item mt={2} xs={6} sm={8.8} width={"60%"} md={8.8} bgcolor={"#c3d7f7"} >
            <MessageArea user={selectedUser} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
