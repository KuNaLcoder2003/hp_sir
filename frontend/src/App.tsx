
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signin from './components/Signin'
import StudentDashboard from './components/StudentDashboard'
import Tests from './components/Tests'
import TeacherDashboard from './components/TeacherDashboard'
import TeacherCourse from './components/TeacherCourse'
import StudentSignUp from './components/StudentSignUp'
import { useEffect, useState } from 'react'



function App() {
  const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false)
  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  },[])
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<Signin setIsLOggedIn={setIsLoggedIn} />} />
      <Route path='/dashboard' element={ isLoggedIn ? <StudentDashboard setIsLoggedIn={setIsLoggedIn} /> : <Signin setIsLOggedIn={setIsLoggedIn} /> } />
      <Route path='/tests' element={<Tests />  } />
      <Route path='/teacher' element={isLoggedIn ? <TeacherDashboard /> : <LandingPage/>} />
      <Route path='/teacher/course/:id' element={isLoggedIn ? <TeacherCourse/> : <LandingPage/>} />
      <Route path='/register' element={<StudentSignUp/>} />
    </Routes>
  )
}

export default App
