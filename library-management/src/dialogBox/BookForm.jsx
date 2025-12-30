import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
function BookForm({ open, onClose, onSave, selectedBook }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (open) {
      if (selectedBook) {
        // Edit Mode: Set preview from existing data
        const cleanPath = selectedBook.cover_image?.replace(/\\/g, "/");
        setPreview(cleanPath ? `${BASE_URL}/${cleanPath}` : null);
      } else {
        // Add Mode: Explicitly reset everything
        setPreview(null);
        formik.resetForm();
      }
    }
  }, [selectedBook, open]);

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "> fieldset": {
        borderRadius: "12px",
      },
    }
  };

const BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

  useEffect(() => {
    if (selectedBook?.image) {
      const cleanPath = selectedBook.image.replace(/\\/g, "/");
      setPreview(`${BASE_URL}/${cleanPath}`);

    }
  }, [selectedBook]);
  
  const formik = useFormik({
     enableReinitialize: true,
     initialValues: {
       title: selectedBook?.title || "",
       author: selectedBook?.author || "",
       category: selectedBook?.category || "",
       image : selectedBook?.image?.replace(/\\/g, "/") || "",
       imageFile: null
     },
     validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string().required("category is required"),
      image: Yup.string().test("required-image", "Image is required", function (value) {
        if (selectedBook) return true; // skip when editing
        return !!this.parent.imageFile;
      })
    }),
     onSubmit: async (values, {resetForm}) => {
       await onSave({...values,id : selectedBook?.id})
       resetForm();
       setPreview(null);
      }
   });
   const handleClose = () =>{
     formik.resetForm();   
     setPreview(null);
     onClose()
   }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("imageFile", file);
    formik.setFieldValue("image", file.name)  
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  return (
    <div>
       <Dialog open={open} onClose={handleClose} 
        sx={{
          "& .MuiDialog-paper": {
            boxSizing: "border-box",
            width: "700px",
            padding: 0,
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#ffffffff"
          }
        }}> 
          <DialogTitle
            sx={{
            textAlign: 'center',
            fontWeight: '700',
            color: selectedBook ? "#e3be09ff" : "#20c62dff"
          }}>
            {selectedBook ? "Update Book Details" : "Register New Book"}</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <TextField 
            placeholder="Title" 
            name="title"
            sx={textFieldStyle} 
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title} />
            <TextField 
            placeholder="Author" 
            name="author"
            sx={textFieldStyle} 
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author} />
            
            <TextField
                select
                name="category"
                placeholder='Select Category'
                sx={textFieldStyle}
                value={formik.values.category}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  <span style={{ color: "#999" }}>Select Category</span>
                </MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="Friction">Friction</MenuItem>
                <MenuItem value="story">story</MenuItem>
              </TextField>
             <div style={{ display: "flex", flexDirection: "column", gap: '6px' }}>
                <label
                  htmlFor="image"
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "fit-content",
                    fontSize: "14px",
                  }}
                > Choose File</label>
                <input
                  id='image'
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onBlur={formik.handleBlur}
                  onChange={handleImageChange}
                />
                {formik.values.image && (
                  <span style={{ fontSize: "14px", color: "#333" }}>
                    Selected: {formik.values.image.split("/").pop()}
                  </span>
                )}

                {formik.touched.image && formik.errors.image && (
                  <p style={{ color: "red", margin: 0 }}>{formik.errors.image}</p>
                )}
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100px", height: "100px", borderRadius: "10px" }}
                />
              )}
              </div>
          <DialogActions>
              <Button sx={{ color: 'red', textTransform: 'capitalize' }} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedBook ? "#e3be09ff" : "#20c62dff",
                  borderRadius: '25px',
                  textTransform: 'capitalize'
                }}
                type="submit"
              >
                {selectedBook ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default BookForm
 