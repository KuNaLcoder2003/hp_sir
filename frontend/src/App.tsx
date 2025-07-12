
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signin from './components/Signin'
import StudentDashboard from './components/StudentDashboard'
import Tests from './components/Tests'



function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/dashboard' element={<StudentDashboard/>} />
      <Route path='/tests' element={<Tests/>} />
       
    </Routes>
  )
}

export default App
