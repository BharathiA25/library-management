import React, { useState, useEffect } from "react";
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  IconButton, Button, Chip, Tooltip, Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BookForm from "../dialogBox/BookForm";
import DeleteBook from "../dialogBox/DeleteBook";
import CopiesManage from "../dialogBox/CopiesManage";
import CommonShimmer from "../components/CommonShimmer";
import { toast } from "react-toastify";
import {
  getAllBooks, addBook, deleteBook, updateBook,
  createCopies, getBookCopies, updateCopyStatus, deleteCopy
} from "../api/booksApi";
import { getThemeControl } from "../utils";
const IMAGE_BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

function Books() {
  const [books, setBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCopies, setOpenCopies] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCopies, setBookCopies] = useState([]);
  const [copiesCountMap, setCopiesCountMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { textColor, cardBg, activeColor, copiesColor } = getThemeControl()
  useEffect(() => {
    fetchBooks();
  }, []);

  // -- Books 
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await getAllBooks();
      console.log(res)
      const booksData = Array.isArray(res) ? res : res.data || [];
      setBooks(booksData);
      const countMap = {}
      for (const book of booksData) {
        const copies = await getBookCopies(book.id);
        countMap[book.id] = copies.length;
        setCopiesCountMap(countMap);
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  };

  const getFullImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    return `${IMAGE_BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const handleSaveBook = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("category", values.category);

      if (values.imageFile) {
        formData.append("cover_image", values.imageFile);
      }

      if (values.id) {
        await updateBook(values.id, formData);
        toast.success("Book updated successfully");
      } else {
        await addBook(formData);
        toast.success("Book added successfully")
      }

      setOpenForm(false);
      setSelectedBook(null);
      fetchBooks();
    }
    catch (err) {
      console.log("Handle save error ", err)
      toast.error(err)
    }
  };
  const handleCloseBook = () => {
    setOpenForm(false);
    setSelectedBook(null);
    fetchBooks()
  };
  const handleCloseDelete = () => {
    setOpenDelete(false)
    setSelectedBook(null)
  }

  const handleDeleteBook = async (id) => {
    try{
      setDeleting(true)
      await deleteBook(id),
      setOpenDelete(false);
      setSelectedBook(null);
      toast.success("Book Deleted Succesfully")
    }
    catch(err){
      toast.error(err)
    }
    finally{
    setDeleting(false)  
    fetchBooks()
    }
  }

  // --- COPY MANAGEMENT ---
  const handleOpenCopies = async (book) => {
    setSelectedBook(book);
    const res = await getBookCopies(book.id);
    console.log("res : ", res)
    console.log("res length", res.length)
    setCopiesCountMap(prev => ({
      ...prev,
      [book.id]: res.length
    }))
    setBookCopies(res || []);
    setOpenCopies(true);

  };
  const updateCopyCount = async (bookId) => {
    const copies = await getBookCopies(bookId);
    setCopiesCountMap(prev => ({
      ...prev,
      [bookId]: copies.length
    }));
    toast.success("Added book count")
  }
  const handleStatusChange = async (copyId, currentStatus) => {
    const nextStatus = currentStatus === "AVAILABLE" ? "ISSUED" : "AVAILABLE";
    await updateCopyStatus(copyId, nextStatus);
    const updated = await getBookCopies(selectedBook.id);
    setBookCopies(updated);
    toast.success("Status updated")
  };

  const handleDeleteCopy = async (copyId) => {
    await deleteCopy(copyId);
    const updated = await getBookCopies(selectedBook.id);
    setBookCopies(updated);
    setCopiesCountMap(prev => ({
      ...prev,
      [selectedBook.id]: updated.length
    }));
    toast.success("Deleted Book count")
    fetchBooks();
  };

  const handleQuickAddCopy = async (bookId) => {
    await createCopies(bookId, 1);
    await updateCopyCount(bookId)
    fetchBooks();
  };


  return (
    <Box sx={{ p: 4, backgroundColor: cardBg, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" fontWeight="700" sx={{ color: textColor }}>Library Catalog</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => { setSelectedBook(null); setOpenForm(true); }} sx={{ borderRadius: 3, bgcolor: activeColor }}>
          Add Book
        </Button>
      </Box>
      {loading ? (<CommonShimmer type="cardGrid" count={8} />) : (
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => {
            const count = copiesCountMap[book.id] || 0;
            const hasCopies = count > 0;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  position: "relative",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}>

                  {/* Availability Overlay */}
                  {!hasCopies && (
                    <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                      <Chip label="Unavailable" color="error" size="small" icon={<ErrorOutlineIcon />} />
                    </Box>
                  )}

                  <CardMedia
                    component="img"
                    image={getFullImageUrl(book.cover_image)}
                    alt={book.title}
                    sx={{
                      width: "200px",      // fills card width
                      height: "180px",        // fixed height for all images
                      objectFit: "cover", // crops/adjusts image to fit
                      p: 2,
                      borderRadius: '25px',
                    }} />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="700" noWrap>{book.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{book.author}</Typography>

                    <Box sx={{p: 1, bgcolor: textColor, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ cursor: 'pointer', color: copiesColor }} onClick={() => handleOpenCopies(book)}>
                        Copies: {count}
                      </Typography>
                      <IconButton size="small" onClick={() => handleQuickAddCopy(book.id)} color="success">
                        <AddCircleIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <Divider />

                  <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={() => { setSelectedBook(book); setOpenForm(true); }} color="primary">
                      <EditIcon />
                    </IconButton>

                    {/* RESTRICT DELETE: Disabled if copies exist */}
                    <Tooltip title={hasCopies ? "Cannot delete book while copies exist" : "Delete Book"}>
                      <span>
                        <IconButton
                          color="error"
                          disabled={hasCopies}
                          onClick={() => { setSelectedBook(book); setOpenDelete(true); }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      <BookForm
        open={openForm}
        onClose={handleCloseBook}
        onSave={handleSaveBook}
        selectedBook={selectedBook}
      />
      <CopiesManage
        open={openCopies}
        onClose={() => setOpenCopies(false)}
        copies={bookCopies}
        onDelete={handleDeleteCopy}
        onSwitchStatus={handleStatusChange} />

      <DeleteBook
        open={openDelete}
        onClose={handleCloseDelete}
        onDelete={handleDeleteBook}
        selectedBook={selectedBook}
        deleting = {deleting}
      />

    </Box>
  );
}

export default Books;