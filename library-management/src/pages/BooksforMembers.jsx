import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline, Store } from "@mui/icons-material";
import { getAllBooks } from "../api/booksApi";
import { avaiableCount, issueBookforMembers } from "../api/MemberApi";
import { toast } from "react-toastify";
import StoreBook from "../dialogBox/StoreBook";



const IMAGE_BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

function BooksforMembers() {
    const [books, setBooks] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [issuing, setIssuing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooksWithAvailability();
    }, []);

    const fetchBooksWithAvailability = async () => {
        try {
            const res = await getAllBooks();
            const booksData = Array.isArray(res) ? res : res.data || [];

            const booksWithAvailability = await Promise.all(
                booksData.map(async (book) => {
                    try {
                        const countRes = await avaiableCount(book.id);
                        console.log("AVAILABLE COUNT RESPONSE:", countRes);

                        return {
                            ...book,
                            availableCopies: countRes.available_copies || 0
                        };
                    } catch (err) {
                        return {
                            ...book,
                            availableCopies: 0
                        };
                    }
                })
            );

            setBooks(booksWithAvailability);
        } catch (error) {
            console.error("Failed to load books", error);
        }
    };
    const getImage = (path) =>
        path
            ? `${IMAGE_BASE_URL}/${path.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/300x400";
    const handleAddToStore = async() =>{
        if(!selectedBook) return
        try{
            setIssuing(true);
            const res = await issueBookforMembers(selectedBook.id);
            toast.success("Added to store successfully");
            setOpenConfirm(false);
            setSelectedBook(null);
            fetchBooksWithAvailability();
            navigate("/member/store");
        }
        catch(err){
            const msg = err?.response?.data?.detail?.message || "Failed to add book";
            toast.error(msg);
        }
        finally{
            setIssuing(false)
        }
    }
    return (
        <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Available Books
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {books.map((book) => {
                    const available = book.availableCopies || 0;

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                            <Card
                                sx={{
                                    position: "relative",
                                    borderRadius: 3,
                                    cursor: available ? "pointer" : "not-allowed",
                                    overflow: "hidden",
                                    transition: "0.3s",
                                    "&:hover .hoverOverlay": {
                                        opacity: available ? 1 : 0
                                    }
                                }}
                                onClick={() => {
                                    if (available > 0) {
                                        setSelectedBook(book);
                                        setOpenConfirm(true);
                                    }
                                }}
                            >
                                {/* UNAVAILABLE CHIP */}
                                {available === 0 && (
                                    <Chip
                                        label="Unavailable"
                                        color="error"
                                        size="small"
                                        icon={<ErrorOutline />}
                                        sx={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
                                    />
                                )}

                                {/* IMAGE */}
                                <CardMedia
                                    component="img"
                                    height="260"
                                    image={getImage(book.cover_image)}
                                    alt={book.title}
                                    sx={{
                                        filter: available !== 0 ? "none" : "grayscale(100%)",
                                        transition: "0.3s"
                                    }}
                                />

                                {/* HOVER OVERLAY */}
                                <Box
                                    className="hoverOverlay"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "rgba(0,0,0,0.6)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#55acbcff",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        opacity: 0,
                                        transition: "0.3s"
                                    }}
                                >
                                    <Store sx={{ mr: 1 }} /> Add to Store
                                </Box>

                                {/* CONTENT */}
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.author}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color={available > 0 ? "success.main" : "error.main"}
                                    >
                                        Available: {available}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <StoreBook
            open={openConfirm}
            onClose={()=>setOpenConfirm(false)}
            addToStore={handleAddToStore}
            issuing={issuing}/>
           </>
    );
}

export default BooksforMembers;
