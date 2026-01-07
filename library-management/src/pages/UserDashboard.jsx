import React, { useState } from "react";
import { Box, Typography, IconButton,  Menu, MenuItem, Divider} from "@mui/material";
import{AccountCircle , Store, Edit,Logout,Book} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import { getThemeControl } from "../utils";
function UserDashboard() {
  const navigate = useNavigate();
  const {bgColor, textColor, userPanelBg} = getThemeControl()
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToStore = () => {
    navigate("/member/store");
    handleMenuClose();
  };

  const goToBooks = () => {
    navigate("/member/books");
    handleMenuClose();
  };

  return (
    <Box sx={{ height: "100vh",width:'100vw', display: "flex", flexDirection: "column" }}>
      
      {/* HEADER */}
      <Box
        sx={{
          minHeight:'70px',
          background: bgColor,
          color :textColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          fontWeight: "bold"
        }}
      >
        <Typography variant="h6" fontWeight={600} >Library System</Typography>

        {/* RIGHT ICON */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Box>

      {/* RIGHT MINI MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={goToBooks} >
          <Book sx={{ mr: 1 }} /> Books
        </MenuItem>

        <MenuItem onClick={goToStore}>
          <Store sx={{ mr: 1 }} /> Store
        </MenuItem>

        <MenuItem 
        onClick={() => {
          navigate("/member/edit-profile");
          handleMenuClose();
          }}
        >
          <Edit sx={{ mr: 1 }} /> Edit Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={ () => {
          handleMenuClose()
          localStorage.removeItem("token")
          navigate('/', {replace : true})
        }} sx={{ color: "red" }}>
          <Logout sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, p: 3, background:userPanelBg }}>
        <Box
          sx={{
            height: "100%",
            backgroundColor: textColor,
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            p: 3,
            overflow: "auto"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard;
