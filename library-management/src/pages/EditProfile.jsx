import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, InputAdornment, IconButton, Typography, Paper} from "@mui/material";
import { AccountCircle, Email, Lock, Visibility, VisibilityOff,} from "@mui/icons-material";
import { getAllmembers, editMember } from "../api/MemberApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [memberId, setMemberId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Name is required"),
      password: Yup.string().min(6, "Min 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = { name: values.name };
        if (values.password) payload.password = values.password;
        await editMember(payload, memberId);
        toast.success("Profile updated successfully");
        navigate('/member')
        formik.setFieldValue("password", "");
      } catch {
        toast.error("Update failed");
      }
    },
  });

  useEffect(() => {
    const fetchMember = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { user_id } = jwtDecode(token);
      const members = await getAllmembers();
      const me = members.find((m) => Number(m.id) === Number(user_id));
      if (!me) return;
      setMemberId(me.id);
      formik.setValues({ name: me.name, email: me.email, password: "" });
    };
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
        <Typography variant="h6" fontWeight={600} mb={2} textAlign="center">
          Edit Profile
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* NAME */}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
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
                  <Lock color="primary" />
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
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Update Profile
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProfile;
