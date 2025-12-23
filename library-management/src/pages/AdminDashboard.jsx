import { Box, Button, Typography } from "@mui/material";
import { People, Book } from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* HEADER */}
      <Box
        sx={{
          height: 70,
          backgroundColor: "#1a4ca2",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: "bold",
          flexShrink: 0, // Prevents header from shrinking
        }}
      >
        Admin Dashboard
      </Box>

      {/* BODY CONTAINER */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        
        {/* SIDEBAR */}
        <Box
          sx={{
            width: "20%", // Replaces md={2.4}
            backgroundColor: "#f4f6f8",
            borderRight: "1px solid #ddd",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Admin Panel
          </Typography>

          <Button
            fullWidth
            startIcon={<People />}
            variant={location.pathname.includes("members") ? "contained" : "text"}
            sx={{ mb: 2, justifyContent: "flex-start" }}
            onClick={() => navigate("/admin/members")}
          >
            Members
          </Button>

          <Button
            fullWidth
            startIcon={<Book />}
            variant={location.pathname.includes("books") ? "contained" : "text"}
            sx={{ justifyContent: "flex-start" }}
            onClick={() => navigate("/admin/books")}
          >
            Books
          </Button>
        </Box>

        {/* MAIN CONTENT AREA */}
        <Box 
          sx={{ 
            width: "80%", // Replaces md={9.6}
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