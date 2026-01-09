
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Batch from './components/Batch'
import NotFound from './components/NotFound'
import AdminBatches from './components/AdminBatches'



function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/batch/:batchId' element={<Batch />} />
      <Route path='/batch/err' element={<NotFound />} />
      <Route path='/admin' element={<AdminBatches />} />
    </Routes>
  )
}

export default App
