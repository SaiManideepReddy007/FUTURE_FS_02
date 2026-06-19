import { useState, useEffect } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()
  const token = localStorage.getItem('nestcrm_token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { navigate('/admin'); return }
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await API.get('/api/leads', { headers })
      setLeads(res.data.data)
    } catch {
      navigate('/admin')
    }
    setLoading(false)
  }

  const updateLead = async (id, data) => {
    try {
      await API.put(`/api/leads/${id}`, data, { headers })
      fetchLeads()
    } catch { alert('Update failed') }
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      await API.delete(`/api/leads/${id}`, { headers })
      fetchLeads()
    } catch { alert('Delete failed') }
  }

  const logout = () => {
    localStorage.removeItem('nestcrm_token')
    navigate('/admin')
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }
  const statusColor = { new: '#3182CE', contacted: '#D69E2E', converted: '#38A169', lost: '#E53E3E' }

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading...</div>

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h1 style={{ color: '#2C5282', margin: 0, fontSize: '22px' }}>🏠 NestCRM Dashboard</h1>
        <button onClick={logout} style={s.logoutBtn}>Logout</button>
      </div>

      <div style={s.statsRow}>
        {[
          { label: 'Total Leads', value: stats.total, color: '#2C5282' },
          { label: 'New', value: stats.new, color: '#3182CE' },
          { label: 'Contacted', value: stats.contacted, color: '#D69E2E' },
          { label: 'Converted', value: stats.converted, color: '#38A169' },
        ].map(stat => (
          <div key={stat.label} style={s.statCard}>
            <p style={{ color: stat.color, fontSize: '32px', fontWeight: '700', margin: 0 }}>{stat.value}</p>
            <p style={{ color: '#718096', margin: '5px 0 0', fontSize: '14px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={s.filterRow}>
        {['all', 'new', 'contacted', 'converted', 'lost'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ ...s.filterBtn, background: filter === f ? '#2C5282' : 'white', color: filter === f ? 'white' : '#4A5568' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={s.empty}>No leads found 📭</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(lead => (
            <div key={lead._id} style={s.leadCard}>
              <div style={s.leadTop}>
                <div>
                  <h3 style={{ margin: '0 0 5px', color: '#2D3748' }}>{lead.name}</h3>
                  <p style={s.info}>📧 {lead.email} &nbsp;|&nbsp; 📞 {lead.phone} &nbsp;|&nbsp; 📍 {lead.city}</p>
                  <p style={s.info}>🛏️ {lead.roomType} Room &nbsp;|&nbsp; 💰 {lead.budget} &nbsp;|&nbsp; 📅 {lead.moveInDate}</p>
                  {lead.message && <p style={s.info}>💬 {lead.message}</p>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ ...s.badge, background: statusColor[lead.status] }}>{lead.status}</span>
                  <button onClick={() => deleteLead(lead._id)} style={s.deleteBtn}>🗑️</button>
                </div>
              </div>
              <div style={s.leadBottom}>
                <select value={lead.status} onChange={e => updateLead(lead._id, { status: e.target.value })} style={s.select}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
                <input style={s.notesInput} placeholder="Add notes..." defaultValue={lead.notes}
                  onBlur={e => updateLead(lead._id, { notes: e.target.value })} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const s = {
  container: { minHeight: '100vh', background: '#f0f4f8', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px 25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logoutBtn: { padding: '8px 20px', background: '#E53E3E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  statsRow: { display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' },
  statCard: { flex: 1, minWidth: '120px', background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  filterRow: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  filterBtn: { padding: '8px 16px', border: '1px solid #E2E8F0', borderRadius: '20px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  leadCard: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  leadTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
  info: { margin: '3px 0', color: '#718096', fontSize: '14px' },
  badge: { padding: '4px 12px', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
  leadBottom: { display: 'flex', gap: '10px' },
  select: { padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px' },
  notesInput: { flex: 1, padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px' },
  empty: { textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#718096', fontSize: '18px' }
}