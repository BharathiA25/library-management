import React, { useState } from 'react'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import { Box, Button, Paper, Toolbar, Typography } from '@mui/material'
import { getThemeControl } from '../utils.js'
function UserLandingpage() {

  const [activeForm, setActiveForm] = useState("login")
  const { bgColor, textColor, paperColor,buttonTransparent,helpingColor} = getThemeControl();

  return (
    <>
      <Box sx={{ minHeight: '100dvh', overflow: 'hidden',width:'100vw', background: bgColor }}>
       
        <Box sx={{
          minHeight: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}>

          <Paper elevation={6} sx={{ minHeight: '400px', width: '400px', backgroundColor: paperColor, borderRadius: '50px', padding: '20px' }}>
            <Box >
              <Typography variant='h6' sx={{ fontFamily: 'sans-serif', fontWeight: '600', marginTop: '15px', textAlign: 'center', color: textColor }}>{activeForm === 'login' ? "Login " : "SignUp "}Form</Typography>
              <Toolbar
                sx={{

                  backgroundColor: '#8c848413',
                  margin: '20px auto',
                  minHeight: '30px !important',
                  width: '200px',
                  borderRadius: '10px',
                  border: "1px solid rgba(0,0,0,0.2)",
                  padding: "0 !important"
                }} >
                <Button
                  onClick={() => setActiveForm("login")}
                  sx={{
                    width: activeForm === "login" ? "70%" : "50%",
                    height: "100%",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "600",
                    background: activeForm ==="login"? bgColor : buttonTransparent ,
                    color: activeForm ==="login"?textColor : helpingColor,
                    transition: "0.3s",
                  }}

                >
                  Login
                </Button>
                <Button
                  onClick={() => setActiveForm("signup")}
                  sx={{
                    width: activeForm === "signup" ? "70%" : "50%",
                    height: "100%",
                    borderRadius: "10px",
                    textTransform : "none",
                    fontWeight: "600",
                    background: activeForm ==="signup"? bgColor : buttonTransparent ,
                    color: activeForm ==="signup"?textColor : helpingColor,
                    transition: "0.3s",
                  }}
                >
                  Signup
                </Button>

              </Toolbar>


            </Box>
            {activeForm === 'login' ?
              <Login switchToSignup={() => setActiveForm("signup")} />
              : <Signup switchToLogin={() => setActiveForm("login")} />}

          </Paper>



        </Box>
      </Box>
    </>
  )
}

export default UserLandingpage
