import React from 'react'

export default function Readings() {
  const [readings, setReadings] = React.useState([])
  const [error, setError] = React.useState(null)
  const [form, setForm] = React.useState({ locationName: '', latitude: '', longitude: '', so2: '', no2: '', spm: '' })

  const load = React.useCallback(() => {
    setError(null)
    fetch('/api/readings').then(async r => {
      if (!r.ok) {
        const body = await r.json().catch(() => ({}))
        throw new Error(body.error || 'failed')
      }
      return r.json()
    }).then(setReadings).catch(e => setError(e.message))
  }, [])

  React.useEffect(() => { load() }, [load])

  function submit(e) {
    e.preventDefault()
    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      so2: Number(form.so2),
      no2: Number(form.no2),
      spm: Number(form.spm),
    }
    fetch('/api/readings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(async r => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}))
          throw new Error(body.error || 'failed')
        }
      })
      .then(() => { setForm({ locationName: '', latitude: '', longitude: '', so2: '', no2: '', spm: '' }); load() })
      .catch(e => setError(e.message))
  }

  return (
    <div>
      {error && <div className="alert alert-warning">{error === 'db_disconnected' ? 'Database is not connected. Start MongoDB to enable readings.' : error}</div>}

      <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, max-content))', gap: 8 }}>
        <input required placeholder="Location" value={form.locationName} onChange={e => setForm({ ...form, locationName: e.target.value })} style={{ width: '140px', justifySelf: 'start' }} />
        <input required placeholder="Lat" value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} style={{ width: '100px', justifySelf: 'start' }} />
        <input required placeholder="Lng" value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} style={{ width: '100px', justifySelf: 'start' }} />
        <input required placeholder="SO2" value={form.so2} onChange={e => setForm({ ...form, so2: e.target.value })} style={{ width: '100px', justifySelf: 'start' }} />
        <input required placeholder="NO2" value={form.no2} onChange={e => setForm({ ...form, no2: e.target.value })} style={{ width: '100px', justifySelf: 'start' }} />
        <input required placeholder="SPM" value={form.spm} onChange={e => setForm({ ...form, spm: e.target.value })} style={{ width: '100px', justifySelf: 'start' }} />
        <button type="submit" style={{ gridColumn: 'span 2', justifySelf: 'start', width: 'fit-content' }}>Add Reading</button>
      </form>

      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Location</th><th>Lat</th><th>Lng</th><th>SO2</th><th>NO2</th><th>SPM</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {readings.map(r => (
            <tr key={r._id}>
              <td>{r.locationName}</td>
              <td>{r.latitude}</td>
              <td>{r.longitude}</td>
              <td>{r.so2}</td>
              <td>{r.no2}</td>
              <td>{r.spm}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


