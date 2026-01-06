import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getThemeControl } from '../utils'
import { CircularProgress } from "@mui/material";

function BookForm({ open, onClose, onSave, selectedBook }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

  const {inputStyle, textColor,errorStyle, selectedColor, addColor, updateColor, disableColor, imageBg} = getThemeControl();

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
      try{
       setLoading(true) 
       await onSave({...values,id : selectedBook?.id})
       resetForm();
       setPreview(null);
       onclose()
      }
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false)
      }
      }
   });
 
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    formik.resetForm();
    setPreview(null);
    onClose();
  };
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
          }
        }}> 
          <DialogTitle
            sx={{
            textAlign: 'center',
            fontWeight: '700',
            color: selectedBook ? updateColor : addColor
          }}>
            {selectedBook ? "Update Book Details" : "Register New Book"}</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <TextField 
            placeholder="Title" 
            name="title"
            sx={inputStyle} 
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title} />
            <TextField 
            placeholder="Author" 
            name="author"
            sx={inputStyle} 
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author} />
            
            <TextField
                select
                name="category"
                placeholder='Select Category'
                sx={inputStyle}
                value={formik.values.category}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  <span style={{ color: disableColor }}>Select Category</span>
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
                    backgroundColor: imageBg,
                    color: textColor,
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
                  <span style={{ fontSize: "14px", color: selectedColor }}>
                    Selected: {formik.values.image.split("/").pop()}
                  </span>
                )}

                {formik.touched.image && formik.errors.image && (
                  <p style={errorStyle}>{formik.errors.image}</p>
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
              <Button sx={{ color: 'red', textTransform: 'capitalize' }} disabled ={loading} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled ={loading}
                sx={{
                  backgroundColor: selectedBook ? updateColor : addColor,
                  borderRadius: '25px',
                  textTransform: 'capitalize'
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ): selectedBook ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default BookForm
 