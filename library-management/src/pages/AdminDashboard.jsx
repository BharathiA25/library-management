import { Box, Button, Typography } from "@mui/material";
import { People, Book } from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { getThemeControl } from "../utils";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminPanelColor, textColor, sidebarInActive, sidebarButtonColor } = getThemeControl()
  const isMembersActive = location.pathname.includes("members");
  const isBookActive = location.pathname.includes("books")
  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* HEADER */}
      
      <Box sx={{
        height: 70,
        backgroundColor: adminPanelColor,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position : 'relative',
        fontWeight: "bold",
        flexShrink: 0
      }} > 
        <Typography
    sx={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 20,
      fontWeight: "bold",
    }}
  >
    Admin Dashboard
  </Typography>

  {/* Logout Button */}
  <Button
    variant="contained"
    sx={{
      position: "absolute",
      right: 20,
      backgroundColor: "#fff",
      color: adminPanelColor,
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }}
    onClick={() => {
      localStorage.removeItem("token")
      navigate('/', {replace : true})
    }}
  >
    Logout
  </Button>
      </Box>
      
      {/* BODY CONTAINER */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>

        {/* SIDEBAR */}
        <Box
          sx={{
            width: "10%", // Replaces md={2.4}
            backgroundColor: adminPanelColor,
            borderRight: "1px solid #ddd",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: textColor }}>
            Admin Panel
          </Typography>

          <Button
            fullWidth
            startIcon={<People />}
            variant={isMembersActive ? "contained" : "text"}
            sx={{
              mb: 2,
              justifyContent: "flex-start",
              color: isMembersActive ? textColor : sidebarInActive,
              backgroundColor: isMembersActive ? sidebarButtonColor : "transparent",
              "&:hover": {
                backgroundColor: sidebarButtonColor,
              },
            }}

            onClick={() => navigate("/admin/members")}
          >
            Members
          </Button>

          <Button
            fullWidth
            startIcon={<Book />}
            variant={isBookActive ? "contained" : "text"}
            sx={{
              justifyContent: "flex-start",
              color: isBookActive ? textColor : sidebarInActive,
              backgroundColor: isBookActive ? sidebarButtonColor : "transparent",
              "&:hover": {
                backgroundColor: sidebarButtonColor,
              },
            }}
            onClick={() => navigate("/admin/books")}
          >
            Books
          </Button>
        </Box>

        {/* MAIN CONTENT AREA */}
        <Box
          sx={{
            width: "90%", // Replaces md={9.6}
            p: 3,
            backgroundColor: "#eff1f3ff",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box"
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              p: 3,
              overflow: "auto", // Only this area will scroll
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;