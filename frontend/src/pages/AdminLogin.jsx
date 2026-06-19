import { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/api/auth/login', form)
      localStorage.setItem('nestcrm_token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div style={s.container}>
      <div style={s.card}>
        <h1 style={{ color: '#2C5282', margin: '0 0 5px' }}>🏠 NestCRM</h1>
        <h2 style={{ color: '#4A5568', margin: '0 0 25px', fontWeight: '400' }}>Admin Login</h2>
        {error && <p style={s.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input style={s.input} type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter Username" />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          <a href="/" style={{ color: '#2C7A7B' }}>← Back to Inquiry Form</a>
        </p>
      </div>
    </div>
  )
}

const s = {
  container: { minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' },
  error: { background: '#FFF5F5', color: '#C53030', padding: '10px', borderRadius: '8px', marginBottom: '15px' },
  field: { marginBottom: '15px', textAlign: 'left' },
  label: { fontSize: '14px', fontWeight: '600', color: '#4A5568', display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#2C5282', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }
}