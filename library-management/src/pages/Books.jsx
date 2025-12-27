import React, { useState, useEffect } from "react";
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  IconButton, Button,  Chip, Tooltip, Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BookForm from "../dialogBox/BookForm";
import DeleteBook from "../dialogBox/DeleteBook";
import CopiesManage from "../dialogBox/CopiesManage";
import { toast } from "react-toastify";
import { 
  getAllBooks, addBook, deleteBook, updateBook, 
  createCopies, getBookCopies, updateCopyStatus, deleteCopy 
} from "../api/booksApi";
const IMAGE_BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

function Books() {
  const [books, setBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCopies, setOpenCopies] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCopies, setBookCopies] = useState([]);
  const [copiesCountMap, setCopiesCountMap] = useState({});

  useEffect(() => { 
    fetchBooks(); 
  }, []);

  // -- Books 
  const fetchBooks = async () => {
    const res = await getAllBooks();
    console.log(res)
    const booksData = Array.isArray(res) ? res : res.data || [];
    setBooks(booksData);
    const countMap = {}
    for (const book of booksData) {
    const copies = await getBookCopies(book.id);
    countMap[book.id] = copies.length;
  }
  setCopiesCountMap(countMap);
  };

  const getFullImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    return `${IMAGE_BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const handleSaveBook = async (values) => {
  try{  
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
catch(err){
  console.log("Handle save error ", err)
  toast.error(err)
}
};
const handleCloseBook = () => {
  setOpenForm(false);
  setSelectedBook(null);
  fetchBooks()
};
const handleCloseDelete = () =>{
  setOpenDelete(false)
  setSelectedBook(null)
}

const handleDeleteBook = async(id) =>{
  await deleteBook(id),
  setOpenDelete(false);
  setSelectedBook(null);
  fetchBooks()
}

  // --- COPY MANAGEMENT ---
  const handleOpenCopies = async (book) => {
    setSelectedBook(book);
      const res = await getBookCopies(book.id);
      console.log("res : ",res)
      console.log("res length",res.length)
      setCopiesCountMap(prev => ({
        ...prev,
        [book.id] : res.length
      }))
      setBookCopies(res || []);
      setOpenCopies(true);
    
  };
  const updateCopyCount = async(bookId) =>{
  const copies = await getBookCopies(bookId);
  setCopiesCountMap(prev => ({
    ...prev,
    [bookId]: copies.length
  }));
  }
  const handleStatusChange = async (copyId, currentStatus) => {
    const nextStatus = currentStatus === "AVAILABLE" ? "ISSUED" : "AVAILABLE";
    await updateCopyStatus(copyId, nextStatus);
    const updated = await getBookCopies(selectedBook.id);
    setBookCopies(updated);
  };

  const handleDeleteCopy = async (copyId) => {
    await deleteCopy(copyId);
    const updated = await getBookCopies(selectedBook.id);
    setBookCopies(updated);
    setCopiesCountMap(prev => ({
    ...prev,
    [selectedBook.id]: updated.length
  }));
    fetchBooks();
  };

  const handleQuickAddCopy = async (bookId) => {
    await createCopies(bookId, 1);
    await updateCopyCount(bookId)
    fetchBooks();
  };


  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" fontWeight="800">Library Catalog</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => { setSelectedBook(null); setOpenForm(true); }} sx={{ borderRadius: 3, bgcolor: "#20c62d" }}>
          Add Book
        </Button>
      </Box>

      <Grid container  sx={{display:'flex', justifyContent:'space-around',gap:'20px'}}>
        {books.map((book) => {
          const count = copiesCountMap[book.id] || 0;
          const hasCopies = count > 0;
          return (
            <Grid container justifyContent="center" key={book.id}>
              <Card sx={{ borderRadius: 4, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                {/* Availability Overlay */}
                {!hasCopies && (
                  <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                    <Chip label="Unavailable" color="error" size="small" icon={<ErrorOutlineIcon />} />
                  </Box>
                )}

                <CardMedia component="img" height="220" image={getFullImageUrl(book.cover_image)} alt={book.title} />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="700" noWrap>{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                  
                  <Box sx={{ mt: 2, p: 1, bgcolor: "#f9f9f9", borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => handleOpenCopies(book)}>
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
        <BookForm
            open={openForm}
            onClose={handleCloseBook}
            onSave={handleSaveBook}
            selectedBook={selectedBook}
        />
        <CopiesManage 
        open={openCopies}
        onClose={()=>setOpenCopies(false)}
        copies={bookCopies}
        onDelete={handleDeleteCopy}
        onSwitchStatus={handleStatusChange}/>

      <DeleteBook
        open = {openDelete}
        onClose={handleCloseDelete}
        onDelete={handleDeleteBook}
        selectedBook={selectedBook}  
      />

    </Box>
  );
}

export default Books;