import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {getThemeColors, inputStyle, getButtonStyle, errorStyle, fieldWrapper } from '../utils.js'
import {login} from '../api/MemberApi.jsx';

function Login({switchToSignup, themeProvider }) {
  const formik = useFormik({
    initialValues: {
        email:'',
        password:''
    },  
  validationSchema : Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  }),
  onSubmit: (values) => {
    console.log('login form ', values);
    login(values);
    },
    });
  const {textColor, spanColor} =getThemeColors(themeProvider);
  const buttonStyle = getButtonStyle(themeProvider);
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "85%", marginTop: "10px" , display:'flex',flexDirection:'column',gap:"28px" }}>  
       <form onSubmit={formik.handleSubmit}>
        <div style={fieldWrapper}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p style={errorStyle}>{formik.errors.email}</p>
          )}
        </div>
        <div style={fieldWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p style={errorStyle}>{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" style={buttonStyle}>Login</button>
       </form>
        <p style={{padding:'20px' ,marginTop:'10px', textAlign:'center' , color:textColor}}> Not a member ? <span style={{color: spanColor ,cursor:'pointer'}} onClick={switchToSignup}>Signup now</span> </p>
      </div>
    </div>
  )
}

export default Login
