import { useState } from 'react'
import API from '../api'

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    roomType: 'Single', budget: '', moveInDate: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/api/leads', form)
      setSubmitted(true)
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) return (
    <div style={s.center}>
      <div style={s.card}>
        <h2>🏠 Thank You!</h2>
        <p>Your inquiry has been submitted successfully.</p>
        <p>Our team will contact you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} style={s.btn}>Submit Another</button>
      </div>
    </div>
  )

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#2C5282', margin: 0 }}>🏠 NestCRM</h1>
          <p style={{ color: '#718096' }}>Hostel Room Inquiry Form</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>Full Name *</label>
              <input style={s.input} name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" />
            </div>
            <div style={s.field}>
              <label style={s.label}>Phone Number *</label>
              <input style={s.input} name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>Email Address *</label>
              <input style={s.input} type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
            <div style={s.field}>
              <label style={s.label}>City (From)</label>
              <input style={s.input} name="city" value={form.city} onChange={handleChange} placeholder="Your current city" />
            </div>
          </div>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>Room Type</label>
              <select style={s.input} name="roomType" value={form.roomType} onChange={handleChange}>
                <option>Single</option>
                <option>Double</option>
                <option>Triple</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Budget (per month)</label>
              <input style={s.input} name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹5000" />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Preferred Move-in Date</label>
            <input style={s.input} type="date" name="moveInDate" value={form.moveInDate} onChange={handleChange} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Message</label>
            <textarea style={{ ...s.input, height: '80px', resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Any specific requirements..." />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Inquiry 🏠'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#718096' }}>
          Admin? <a href="/admin" style={{ color: '#2C7A7B' }}>Login here</a>
        </p>
      </div>
    </div>
  )
}

const s = {
  container: { minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  center: { minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '620px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  row: { display: 'flex', gap: '15px' },
  field: { flex: 1, marginBottom: '15px', display: 'flex', flexDirection: 'column' },
  label: { fontSize: '14px', fontWeight: '600', color: '#4A5568', marginBottom: '5px' },
  input: { padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#2C5282', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }
}