import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, InputAdornment, IconButton, Typography, Paper, CircularProgress} from "@mui/material";
import { AccountCircle, Email, Lock, Visibility, VisibilityOff,} from "@mui/icons-material";
import { getAllmembers, editMember } from "../api/MemberApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getThemeControl } from "../utils";

function EditProfile() {
  const [memberId, setMemberId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const {selectedColor, inputStyle,buttonStyle,helpingColor} = getThemeControl()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Name is required"),
      password: Yup.string().min(6, "Min 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const payload = { name: values.name };
        if (values.password) payload.password = values.password;
        await editMember(payload, memberId);
        toast.success("Profile updated successfully");
        navigate('/member')
        formik.setFieldValue("password", "");
      } catch {
        toast.error("Update failed");
      }
      finally{
        setLoading(false)
      }
    },
  });

  useEffect(() => {
    const fetchMember = async () => {
      try{
      const token = localStorage.getItem("token");
      if (!token) return;
      const { user_id } = jwtDecode(token);
      const members = await getAllmembers();
      const me = members.find((m) => Number(m.id) === Number(user_id));
      if (!me) return;
      formik.setValues({ name: me.name, email: me.email, password: "" });
      setMemberId(me.id);
    }
    catch(err){
      console.log(err)
    }
  }
    fetchMember();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2} textAlign="center" color= {selectedColor}>
          Edit Profile
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* NAME */}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            sx={inputStyle}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{color: helpingColor}} />
                </InputAdornment>
              ),
            }}
          />

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            disabled
            name="email"
            sx={inputStyle}
            value={formik.values.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            label="New Password (optional)"
            margin="normal"
            sx={inputStyle}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{color:helpingColor}} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={buttonStyle}
          >
           {loading ? (<CircularProgress size={20} sx={{ color: "white" }}/>) : " Update Profile"}
          </Button>
        </form> 
      </Paper>
    </Box>
  );
}

export default EditProfile;
