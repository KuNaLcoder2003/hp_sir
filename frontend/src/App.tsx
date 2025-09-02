
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signin from './components/Signin'
import StudentDashboard from './components/StudentDashboard'
import Tests from './components/Tests'
import TeacherDashboard from './components/TeacherDashboard'
import TeacherCourse from './components/TeacherCourse'
import StudentSignUp from './components/StudentSignUp'
import Subject from './components/Subject'
import { BasicExample } from "./components/Demo"
import TeacherAuth from './components/TeacherAuth'
import { useAuth } from './context/authContext'
import TestDetails from './components/TestDetails'
import TeacherTest from './components/TeacherTest'

import DoubtForm from './components/SlotBooking'
import Thanks from './components/Thanks'
import WeekManagement from './components/WeekManagement'



function App() {
  const { isAdmin, loggedIn } = useAuth()
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={loggedIn ? (isAdmin ? <TeacherDashboard /> : <StudentDashboard />) : <Signin />} />
      <Route path='/dashboard' element={loggedIn ? <StudentDashboard /> : <Signin />} />
      <Route path='/tests/:batchID' element={loggedIn ? <Tests /> : <LandingPage />} />
      <Route path='/teacher' element={<TeacherDashboard />} />
      <Route path='/teacher/course/:id' element={<TeacherCourse />} />
      <Route path='/register' element={<StudentSignUp />} />
      <Route path='/demo' element={<BasicExample />} />
      <Route path='/testDetails/:testId' element={loggedIn ? <TestDetails /> : <LandingPage />} />
      <Route path='/teacher/test/:batchId/:subjectId' element={<TeacherTest />} />
      <Route path='/subject/:id' element={loggedIn ? <Subject /> : <Signin />} />
      <Route path='/teacher/auth' element={loggedIn && isAdmin ? <TeacherDashboard /> : <TeacherAuth />} />
      <Route path='/slot' element={<DoubtForm />} />
      <Route path='/thanks/:doubtId' element={<Thanks />} />
      <Route path='/teacher/week/:weekId' element={<WeekManagement />} />
    </Routes>
  )
}

export default App
