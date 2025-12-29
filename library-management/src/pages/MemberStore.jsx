import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { getBookStore, returnBookforLibrary } from "../api/MemberApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ReturnDialog from "../dialogBox/ReturnDialog";
import CommonShimmer from "../components/CommonShimmer";

const IMAGE_BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

function MemberStore() {
  const [books, setBooks] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [returning, setReturning] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const memberId = decoded.user_id;

      const res = await getBookStore(memberId);
      setBooks(res || []);
    } catch (err) {
      toast.error("Failed to load store");
    }
    finally {
      setLoading(false)
    }
  };


  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getImage = (path) =>
    path
      ? `${IMAGE_BASE_URL}/${path.replace(/\\/g, "/")}`
      : "https://via.placeholder.com/300x400";
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setOpenConfirm(false)
  };
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Store
      </Typography>
      {loading ? (<CommonShimmer type="cardGrid" count={3} />) :
        books.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={4}>
            No books in your store
          </Typography>) : (
          <Grid container spacing={3} >
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.issue_id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    height: "100%",
                    width: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* BOOK IMAGE */}
                  <CardMedia
                    component="img"
                    image={getImage(book.cover_image)}
                    alt={book.book_title}
                    sx={{
                      width: "200px",      // fills card width
                      height: "180px",        // fixed height for all images
                      objectFit: "cover", // crops/adjusts image to fit
                      p: 2,
                      borderRadius: '25px',
                    }}
                  />

                  {/* CONTENT */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={600} noWrap>
                      {book.book_title}
                    </Typography>

                    {/* DATES */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: '12px'
                      }}
                    >

                      <Typography variant="caption" color="text.secondary">
                        Issued<br />
                        <b>{formatDate(book.issue_date)}</b>
                      </Typography>

                      <Typography variant="caption" color="error.main">
                        Due<br />
                        <b>{formatDate(book.due_date)}</b>
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* RETURN BUTTON */}
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setSelectedIssueId(book.issue_id);
                        setOpenConfirm(true);
                      }}
                      sx={{textTransform : 'capitalize'}}
                    >
                      Return Book
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>)
      }
      <ReturnDialog 
      open={openConfirm}
      onClose={()=>setOpenConfirm(false)}
      returning={returning}
      onConfirm={async() => {
      try {
      setReturning(true);
      await returnBookforLibrary(selectedIssueId);
      toast.success("Book returned successfully");
      setOpenConfirm(false);
      fetchStore();
      navigate("/member/books");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to return book"
      );
    } finally {
      setReturning(false);
    }
    }}/>

    </>
  );
}

export default MemberStore;
