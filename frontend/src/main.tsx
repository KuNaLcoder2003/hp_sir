
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider logInUrl='https://hp-sir.onrender.com/api/v1/student/signin'>
      <App />
    </AuthProvider>
  </BrowserRouter>


)
