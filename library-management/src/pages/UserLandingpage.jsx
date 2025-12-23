import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { Box, Button, colors, Container, Paper, Toolbar, Typography } from '@mui/material'
import { LightMode, DarkMode, Style } from '@mui/icons-material'
import { getThemeColors } from '../utils.js'
function UserLandingpage() {

  const [activeForm, setActiveForm] = useState("login")
  const [themeProvider, setThemeProvider] = useState('dark');
  const { bgColor, textColor, paperColor, lightTheme, darkTheme } = getThemeColors(themeProvider);

  return (
    <>
      <Box sx={{ minHeight: '100dvh', overflow: 'hidden',width:'100vw', background: bgColor }}>
        <Toolbar sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: '#74585850',
          minHeight: '20px !important',
          width: '130px',
          borderRadius: '10px',
          border: "1px solid rgba(0,0,0,0.2)",
          padding: "0 !important",
        }}>
          <Button onClick={() => setThemeProvider("light")} ><LightMode sx={{ color: lightTheme }} /></Button>
          <Button onClick={() => setThemeProvider("dark")}><DarkMode sx={{ color: darkTheme }} /></Button>
        </Toolbar>
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

                    background:
                      themeProvider === "light"
                        ? activeForm === "login"
                          ? "linear-gradient(to right, #a044ff, #e738b1)"
                          : "transparent"
                        : activeForm === "login"
                          ? "linear-gradient(to bottom right, #130223ff, #3d0066)"
                          : "transparent",

                    color:
                      themeProvider === "light"
                        ? activeForm === "login"
                          ? "#fff"
                          : "#000"
                        : activeForm === "login"
                          ? "#fff"
                          : "#fff",

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

                    background:
                      themeProvider === "dark"
                      ?activeForm === "signup"
                        ? "linear-gradient(to bottom right, #130223ff, #3d0066)"
                        : "transparent"
                      : activeForm === "signup"
                      ? "linear-gradient(to right, #a044ff, #e738b1)"
                      :"transparent",
                    color:
                      themeProvider === "dark"
                        ? activeForm === "signup"
                          ? "#fff"
                          : "#fff"
                        : activeForm === "signup"
                          ? "#fff"
                          : "#000",

                    transition: "0.3s",
                  }}
                >
                  Signup
                </Button>

              </Toolbar>


            </Box>
            {activeForm === 'login' ?
              <Login switchToSignup={() => setActiveForm("signup")} themeProvider={themeProvider} />
              : <Signup switchToLogin={() => setActiveForm("login")} themeProvider={themeProvider} />}

          </Paper>



        </Box>
      </Box>
    </>
  )
}

export default UserLandingpage
