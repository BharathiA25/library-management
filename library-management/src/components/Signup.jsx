import React from 'react'
import {useFormik}from 'formik'
import * as Yup from 'yup';
import {getThemeColors, inputStyle,getButtonStyle ,errorStyle, fieldWrapper} from '../utils.js'
import { registerMember } from '../api/MemberApi.jsx';
function Signup({ switchToLogin, themeProvider }) {

  const formilk = useFormik({
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
    onSubmit: (values) => {
      console.log('signup form ', values);
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log('Payload for registration:', payload);
      registerMember(payload);
    },
  })
  const {textColor, spanColor} = getThemeColors(themeProvider)
  const buttonStyle = getButtonStyle(themeProvider);
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div style={{ width: "85%", marginTop: "10px", display:'flex',flexDirection:'column',gap:"28px"}}>
        <form onSubmit={formilk.handleSubmit}>
        <div style={fieldWrapper}>
            <input
                type="text"
                placeholder="Name"
                style={inputStyle}
                name="name"
                value={formilk.values.name}
                onChange={formilk.handleChange}
            />
            {formilk.errors.name && formilk.touched.name && <p style={errorStyle}>{formilk.errors.name}</p>}
        </div>
        <div style={fieldWrapper}>
            <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                name="email"
                value={formilk.values.email}
                onChange={formilk.handleChange}
            />
            {formilk.errors.email && formilk.touched.email && <p style={errorStyle}>{formilk.errors.email}</p>}
        </div>
        <div style={fieldWrapper}>
            <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                name="password"
                value={formilk.values.password}
                onChange={formilk.handleChange}
            />
            {formilk.errors.password && formilk.touched.password && <p style={errorStyle}>{formilk.errors.password}</p>}
        </div>
        <div style={fieldWrapper}>
            <input
                type="password"
                placeholder="Confirm Password"
                style={inputStyle}
                name="confirmPassword"
                value={formilk.values.confirmPassword}
                onChange={formilk.handleChange}
            />
            {formilk.errors.confirmPassword && formilk.touched.confirmPassword && <p style={errorStyle}>{formilk.errors.confirmPassword}</p>}
        </div>
        <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
        <p style={{padding:'20px' ,marginTop:'10px', textAlign:'center' , color:textColor}}> Already a member ? <span style={{color: spanColor ,cursor:'pointer'}} onClick={switchToLogin}>Login here</span> </p>

    </div>
    </div>
  );
}

export default Signup;
