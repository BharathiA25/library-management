import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";
import { getUserBooks } from "../api/booksApi";
import { issueBookforMembers} from "../api/MemberApi";
import { toast } from "react-toastify";
import StoreBook from "../dialogBox/StoreBook";
import { getThemeControl } from "../utils";
import CommonShimmer from "../components/CommonShimmer";
const IMAGE_BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";
const { activeColor, copiesColor, textColor, inActiveColor } = getThemeControl();
function BooksforMembers() {
    const [books, setBooks] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [issuing, setIssuing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooksWithAvailability();
    }, []);

    const fetchBooksWithAvailability = async () => {
        try {
            setLoading(true)
            const res = await getUserBooks();
           const booksData = Array.isArray(res) ? res : res.data || [];
           setBooks(booksData);
        } catch (error) {
            toast.error("Failed to load books")
            console.error("Failed to load books", error);
        }
        finally {
            setLoading(false)
        }
    };
    const getImage = (path) =>
        path
            ? `${IMAGE_BASE_URL}/${path.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/300x400";
    const handleAddToStore = async () => {
        if (!selectedBook) return

        try {
            setIssuing(true);
            const res = await issueBookforMembers(selectedBook.id);
            console.log("id : ", res.issue_id)
            toast.success("Added to store successfully");
            setOpenConfirm(false);
            setSelectedBook(null);
            fetchBooksWithAvailability();
            navigate("/member/store");
        }
        catch (err) {
            const msg = err?.response?.data?.detail?.message || "Failed to add book";
            toast.error(msg);
        }
        finally {
            setIssuing(false)
        }
    }
    
    return (
        <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Available Books
            </Typography>
            {loading ? (
                <CommonShimmer type="cardGrid" count={8} />
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {books.map((book) => {
                        const available = book.available_count;

                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 4,
                                        position: "relative",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                        cursor: available ? "pointer" : "not-allowed",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: available ? "translateY(-6px)" : "none",
                                        },
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
                                        image={getImage(book.cover_image)}
                                        alt={book.title}
                                        sx={{
                                            width: "200px",      // fills card width
                                            height: "180px",        // fixed height for all images
                                            objectFit: "cover", // crops/adjusts image to fit
                                            p: 2,
                                            borderRadius: '25px',
                                            filter: available !== 0 ? "none" : "grayscale(100%)",
                                        }}
                                    />

                                    {/* CONTENT */}
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {book.author}
                                        </Typography>
                                        {book.issue_status === "ISSUED" ? (
                                            <Button
                                                fullWidth
                                                 variant="contained"
                                                 color="error"
                                                onClick={() => navigate("/member/store")}
                                                sx={{
                                                    mt: 2,
                                                    textTransform: "capitalize",
                                                    color: textColor,
                                                }}
                                            >
                                                Already added to store
                                            </Button>
                                        ) : available > 0 ? (
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="caption" color={copiesColor}>
                                                    Available: {available}
                                                </Typography>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedBook(book);
                                                        setOpenConfirm(true);
                                                    }}
                                                    sx={{
                                                        textTransform: "capitalize",
                                                        backgroundColor: activeColor,
                                                        color: textColor,
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Add to store
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Typography sx={{ textAlign: "center", m: 3, color: inActiveColor }}>
                                                Added soon
                                            </Typography>
                                        )}

                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>)}
            <StoreBook
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                addToStore={handleAddToStore}
                issuing={issuing} />
        </>
    );
}

export default BooksforMembers;
