import React from 'react'
import UserLandingpage from './pages/UserLandingpage'
import AdminDashboard from './pages/AdminDashboard'
import MemberList from './pages/MemberList.jsx'
import Books from './pages/Books.jsx'
import UserDashboard from './pages/userDashboard.jsx'
import BooksforMembers from './pages/BooksforMembers.jsx'
import MemberStore from './pages/MemberStore.jsx'
import EditProfile from './pages/EditProfile.jsx'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<UserLandingpage />} />

        <Route path="/admin" element={<AdminDashboard />} >
        <Route index element={<Navigate to="members" replace/> } />
        <Route  path ="members" element={<MemberList />} />
        <Route  path ="books" element={<Books />} />
        </Route>

        <Route path='/member' element = {<UserDashboard/>}>
        <Route index element = {<BooksforMembers/>}/>
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path='books' element = {<BooksforMembers/>}/>
        <Route path='store' element = {<MemberStore/>}/>
        </Route>

      </Routes>
    </Router>
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
