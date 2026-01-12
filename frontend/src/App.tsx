
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Batch from './components/Batch'
import NotFound from './components/NotFound'
import AdminBatches from './components/AdminBatches'
import AdminBatch from './components/AdminBatch'
import AdminSignin from './components/AdminSignin'
import ProtectedAdminRoute from './components/ProtectedRoute'



function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/batch/:batchId' element={<Batch />} />
      <Route path='/batch/err' element={<NotFound />} />
      <Route path='/admin/signin' element={<AdminSignin />} />
      <Route
        path='/admin'
        element={
          <ProtectedAdminRoute>
            <AdminBatches />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path='/admin/batch/:batchId'
        element={
          <ProtectedAdminRoute>
            <AdminBatch />
          </ProtectedAdminRoute>
        } />
    </Routes>
  )
}

export default App
