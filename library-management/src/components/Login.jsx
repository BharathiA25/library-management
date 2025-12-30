import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getThemeColors, inputStyle, getButtonStyle, errorStyle, fieldWrapper } from '../utils.js'
import { login } from '../api/MemberApi.js';
import { jwtDecode } from 'jwt-decode'
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login({ switchToSignup, themeProvider }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Submitting login form with values:", values);
        const data = await login(values);
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          const decodeToken = jwtDecode(data.access_token);
          console.log("Decoded Token:", decodeToken);
          toast.success('login successful');
          if(decodeToken.role === 'admin'){
          navigate('/admin');
          }
          else if(decodeToken.role ==="Member"){
            console.log("Member : ", decodeToken.sub.charAt(0))
            navigate('/member')
          }
        }
        else {
          toast.error(data.error);
        }

      } catch (error) {
        console.error("Login error:", error);
        toast.error(
          error.response?.data?.message || 'Login failed. Please try again.'
        )
      } finally {
        setSubmitting(false);
      }
    }
  });
  const { textColor, spanColor } = getThemeColors(themeProvider);
  const buttonStyle = getButtonStyle(themeProvider);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div style={fieldWrapper}>
          <TextField
            fullWidth
            placeholder="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <p style={errorStyle}>
              {formik.errors.email}
            </p>
          )}
        </div>
      <div style={fieldWrapper}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.password && formik.errors.password && (
            <p style={errorStyle}>
              {formik.errors.password}
            </p>
          )}
        </div>
        <Button type="submit" fullWidth variant="contained" style={buttonStyle}>
          Login
        </Button>
      </form>
            <p style={{ padding: '20px', marginTop: '10px', textAlign: 'center', color: textColor }}> Not a member ? <span style={{ color: spanColor, cursor: 'pointer' }} onClick={switchToSignup}>Signup now</span> </p>
    </>
  )
}

export default Login
