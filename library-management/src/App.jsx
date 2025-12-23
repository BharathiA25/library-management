import React from 'react'
import UserLandingpage from './pages/UserLandingpage'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <UserLandingpage/>
    <ToastContainer
    position='top-center'
    autoClose={2000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    theme='colored'/>

    </>
  )
}

export default App
