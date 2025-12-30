import React , {useState} from 'react'
import {useFormik}from 'formik'
import * as Yup from 'yup';
import {getThemeColors, inputStyle,getButtonStyle ,errorStyle, fieldWrapper} from '../utils.js'
import  {TextField , InputAdornment, Button, IconButton} from '@mui/material'
import {AccountCircle, Email, Lock, Visibility, VisibilityOff} from "@mui/icons-material"
import { toast } from 'react-toastify';
import { registerMember, getAllmembers } from '../api/MemberApi.js';

function Signup({ switchToLogin, themeProvider }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:'',
    confirmPassword:''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character')  
      .required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('signup form ', values);
      try{
        const members = await getAllmembers();
        const emailExists = members.some((member) => member.email === values.email);
        if (emailExists) {
          toast.error('Email is already registered. Please use a different email.');
          return;
        }
        const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log('Payload for registration:', payload);
      await registerMember(payload);
      toast.success('Registration successful! Check your email for verification.');
      switchToLogin();
      }catch(error){
        console.error('Registration error:', error);
            if (error.response?.status === 400) {
        toast.error(
        error.response?.data?.message || 'Email already exists'
      );
    } else {
      toast.error('Registration failed. Please try again.');
    }
      }
    },
  })
  const {textColor, spanColor} = getThemeColors(themeProvider)
  const buttonStyle = getButtonStyle(themeProvider);
  return (
  <>
  <form onSubmit={formik.handleSubmit}>

      <div style={fieldWrapper}>
        <TextField
          fullWidth
          placeholder="Name"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          sx={inputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
          {formik.touched.name && formik.errors.name && (
            <p style={errorStyle}>
              {formik.errors.name}
            </p>
          )}
      </div>

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

      <div style={fieldWrapper}>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...formik.getFieldProps("confirmPassword")}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          sx={inputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment:(
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p style={errorStyle}>
              {formik.errors.confirmPassword}
            </p>
          )}
      </div>

      <Button type="submit" fullWidth variant="contained" style={buttonStyle}>
        Sign Up
      </Button>

    </form>
     <p style={{padding:'20px' ,marginTop:'10px', textAlign:'center' , color:textColor}}> All ready have an account? <span style={{color: spanColor ,cursor:'pointer'}} onClick={switchToLogin}>Login</span> </p>

  </>
  );
}

export default Signup;
