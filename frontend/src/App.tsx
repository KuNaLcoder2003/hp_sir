
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signin from './components/common/Signin'
import StudentDashboard from './components/students/StudentDashboard'
import Tests from './components/students/Tests'
import TeacherDashboard from './components/teacher/TeacherDashboard'
import TeacherCourse from './components/teacher/TeacherCourse'
import StudentSignUp from './components/students/StudentSignUp'
import Subject from './components/students/Subject'
import { BasicExample } from "./components/common/Demo"
import TeacherAuth from './components/teacher/TeacherAuth'
import { useAuth } from './context/authContext'
import TestDetails from './components/students/TestDetails'
import TeacherTest from './components/teacher/TeacherTest'

import DoubtForm from './components/students/SlotBooking'
import Thanks from './components/common/Thanks'
import WeekManagement from './components/teacher/WeekManagement'
import TeacherSignup from './components/teacher/TeacherSignup'



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
      <Route path='/teacher/signup' element={<TeacherSignup />} />
    </Routes>
  )
}

export default App
