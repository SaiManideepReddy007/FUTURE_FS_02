import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InquiryForm from './pages/InquiryForm'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InquiryForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App