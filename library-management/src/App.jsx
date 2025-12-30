import React from 'react'
import UserLandingpage from './pages/UserLandingpage'
import AdminDashboard from './pages/AdminDashboard'
import MemberList from './routes/MemberList.jsx'
import Books from './routes/Books.jsx'
import UserDashboard from './pages/userDashboard.jsx'
import BooksforMembers from './routes/BooksforMembers.jsx'
import MemberStore from './routes/MemberStore.jsx'
import EditProfile from './routes/EditProfile.jsx'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<UserLandingpage />} />

        <Route path="/admin" element={<AdminDashboard />} >
        <Route index element={<MemberList />} />
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
