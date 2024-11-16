/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllUsers } from "./api";
import { Modal, Box, Button, Typography, Grid } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
};

const UserList = ({ onSelectUser }) => {
  
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem]=useState()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllUser = async () => {
    try {
      let response = await getAllUsers();
      setUsers(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);


  const updatedImage = (item) => {
    setSelectedItem(item)
    handleOpen()
  }

  return (
    <>

      <Grid
        container
        mt={0.2}
        mb={0.4}
        height={50}
        borderRadius={2}
        width={"100%"}
      >
        <input
          placeholder="search here ...."
          style={{
            height: "70%",
            width: "90%",
            backgroundColor: "white",
            border: "1px solid white",
            outline: "none",
            borderRadius: "3px",
            padding: "0px 20px ",
            margin: "auto"
          }}
        />
      </Grid>

      <Box
        style={{
          cursor: "pointer",
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "550px",
          position: "relative",
        }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >


        {users?.map((item, index) => (
          <>
            <Grid
              container
              key={index}
              mt={0.2}
              mb={0.4}
              bgcolor={"rgba(13, 10, 100, 0.15)"}
              height={50}
              borderRadius={2}
              width={"95%"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(13, 10, 100, 0.3)",
                },
              }}
            >
              <Grid item xs={6} sm={4} md={3} display="grid" justifyContent={"center"} alignItems={"center"} onClick={() => updatedImage(item)}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s"
                  style={{ borderRadius: "50%", objectFit: "fill", height: "45px", width: "50px", border: "2px solid white", marginLeft: "5px" }}
                  alt="User"
                />
              </Grid>
              <Grid item xs={6} sm={8} md={9} display="grid" alignItems={"center"} onClick={() => onSelectUser(item)}>
                {item?.fullname}
              </Grid>
            </Grid>
          </>
        ))}
      </Box>

      {
        open && <SimpleModal open={open} handleClose={handleClose} selectedItem={selectedItem} />
      }
    </>
  );
};

export default UserList;


const SimpleModal = ({ handleClose, open,selectedItem }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  let imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s"

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} display={"flex"} flexDirection={"column"}  >

            <img
              src={selectedImage ? selectedImage:imgsrc}
              alt="Profile Preview"
              style={{ width: '160px',height:'150px', borderRadius: '50%', margin: '20px auto' }}
            />
          
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Typography component="span" sx={{ mt: 2 }} style={{cursor:"pointer"}}>
              Change Profile Picture
            </Typography>
          </label>
         { selectedImage && <Button  onClick={handleClose} sx={{ mt: 2 }}  style={{cursor:"pointer"}}>
            Update
          </Button> }
          {/* <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button> */}
        </Box>
      </Modal>

    </>
  );
};



