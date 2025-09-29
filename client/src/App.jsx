import React from 'react'
import './App.css'
import MapView from './components/MapView.jsx'
import AQChart from './components/AQChart.jsx'
import Readings from './components/Readings.jsx'
import Forecast from './components/Forecast.jsx'

function App() {
  const [tab, setTab] = React.useState('citizen')
  const [aqiCards, setAqiCards] = React.useState([
    { place: 'Connaught Place, Delhi', value: 186 },
    { place: 'Noida', value: 172 },
    { place: 'AIIMS, Delhi', value: 186 },
    { place: 'Noida', value: 172 },
    
  ])
  const [selectedCity, setSelectedCity] = React.useState('Connaught Place, Delhi')

  function classifyAQI(value) {
    if (value <= 50) return { label: 'Good', cls: 'aqi-good' }
    if (value <= 100) return { label: 'Moderate', cls: 'aqi-moderate' }
    if (value <= 200) return { label: 'Unhealthy', cls: 'aqi-unhealthy' }
    return { label: 'Hazardous', cls: 'aqi-hazardous' }
  }

  function refreshAQI() {
    setAqiCards(prev => prev.map(card => {
      if (card.place !== selectedCity) return card
      const jitter = Math.round((Math.random() - 0.5) * 40)
      const next = Math.max(10, Math.min(400, card.value + jitter))
      return { ...card, value: next }
    }))
  }

  function refreshSources() {
    // Placeholder: in a real app, fetch latest source data
    // For now, just trigger a visual change by toggling tab quickly
    setTab(t => t) // no-op to ensure re-render
  }
  return (
    <div className="container">
      <div className="header">
        <img src="/pngtree-cityscape-vector-detailed-street-map-poster-of-delhi-city-vector-png-image_34943936.png" alt="Delhi-NCR Air Quality Intelligence Logo" width="160" className="logo" />
        <div className="text" style={{ marginLeft: 20, flex: 1 }}>
          <div className="title-row">
            <div>
              <h1 style={{ margin: 0 }}>Delhi-NCR Air Quality Intelligence</h1>
              <p>AI-Driven Pollution Source Identification, Forecasting & Policy Dashboard</p>
            </div>
            <div className="city-chooser">
              <label htmlFor="city-select">City</label>
              <select id="city-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {aqiCards.map(c => (
                  <option key={c.place} value={c.place}>{c.place}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-tabs">
        <button className={`nav-tab ${tab==='citizen'?'active':''}`} onClick={() => setTab('citizen')}>🏠 Citizen Portal</button>
        <button className={`nav-tab ${tab==='forecast'?'active':''}`} onClick={() => setTab('forecast')}>📈 AI Forecasting</button>
        <button className={`nav-tab ${tab==='sources'?'active':''}`} onClick={() => setTab('sources')}>🔍 Source Analysis</button>
        <button className={`nav-tab ${tab==='policy'?'active':''}`} onClick={() => setTab('policy')}>📊 Policy Dashboard</button>
      </div>

      <div style={{ marginTop: 24 }}>
        {tab === 'citizen' && (
          <div className="dashboard-grid">
            <div className="card aqi-card compact-card">
              <h3>🌡️ Current Air Quality</h3>
              {(() => {
                const current = aqiCards.find(c => c.place === selectedCity) || aqiCards[0]
                const meta = classifyAQI(current.value)
                return (
                  <div className={`aqi-display ${meta.cls}`}>
                    <div className="aqi-value">{current.value}</div>
                    <div className="aqi-label">{meta.label}</div>
                    <div style={{ fontSize: '0.9rem', marginTop: 10 }}>{current.place}</div>
                  </div>
                )
              })()}
              <button className="refresh-btn" onClick={refreshAQI}>🔄 Refresh Data</button>
            </div>

            <div className="card alerts-card">
              <h3>⚠️ Health Alerts</h3>
              <div className="alert alert-danger">
                <strong>High Pollution Alert!</strong><br />
                Avoid outdoor activities. Use N95 masks if going outside.
              </div>
              <div className="alert alert-warning">
                <strong>Sensitive Groups:</strong><br />
                Children, elderly, and people with respiratory conditions should stay indoors.
              </div>
            </div>

            <div className="card route-card compact-card">
              <h3>🛣️ Safe Route Suggestions</h3>
              <div className="alert alert-info">
                <strong>Recommended Routes:</strong><br />
                • Nehru Place to CP: Via Metro (AQI: 145)<br />
                • Avoid Ring Road (AQI: 220)<br />
                • Best jogging areas: Lodhi Gardens (AQI: 165)
              </div>
            </div>

            <div className="card">
              <h3>🗺️ Hyperlocal AQI Map</h3>
              <div className="map-container"><MapView /></div>
            </div>
          </div>
        )}
        {tab === 'forecast' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>🔮 24-72 Hour AQI Forecast</h3>
              <div className="chart-container"><AQChart /></div>
              <div className="alert alert-warning">
                <strong>AI Prediction:</strong> AQI expected to reach 250+ tomorrow due to low wind speeds and crop burning activity.
              </div>
            </div>
            <div className="card">
              <h3>📅 Seasonal Trends</h3>
              <div className="chart-container"><AQChart /></div>
            </div>
            <div className="card">
              <h3>🌤️ Weather Impact Analysis</h3>
              <div className="stats-grid">
                <div className="stat-item"><div className="stat-value">12</div><div className="stat-label">Wind Speed (km/h)</div></div>
                <div className="stat-item"><div className="stat-value">68%</div><div className="stat-label">Humidity</div></div>
                <div className="stat-item"><div className="stat-value">22°C</div><div className="stat-label">Temperature</div></div>
              </div>
              <p style={{ marginTop: 15, color: '#666' }}>Low wind speeds are contributing to pollutant accumulation. Expected improvement with upcoming weather front.</p>
            </div>
            <div className="card">
              <h3>🎯 ML Model Accuracy</h3>
              <div className="stats-grid">
                <div className="stat-item"><div className="stat-value">87%</div><div className="stat-label">24h Accuracy</div></div>
                <div className="stat-item"><div className="stat-value">74%</div><div className="stat-label">72h Accuracy</div></div>
              </div>
              <p style={{ marginTop: 15, color: '#666' }}>Model trained on 5 years of multi-source data including satellite imagery, ground sensors, and meteorological data.</p>
            </div>
          </div>
        )}
        {tab === 'sources' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>🔥 Pollution Source Breakdown</h3>
              <div className="source-item"><span>Crop Stubble Burning</span><div className="source-bar"><div className="source-fill" style={{ width: '45%', background: 'linear-gradient(135deg, #ef4444, #dc2626)' }} /></div><span>45%</span></div>
              <div className="source-item"><span>Vehicular Emissions</span><div className="source-bar"><div className="source-fill" style={{ width: '30%', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }} /></div><span>30%</span></div>
              <div className="source-item"><span>Industrial Activity</span><div className="source-bar"><div className="source-fill" style={{ width: '15%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }} /></div><span>15%</span></div>
              <div className="source-item"><span>Construction Dust</span><div className="source-bar"><div className="source-fill" style={{ width: '10%', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }} /></div><span>10%</span></div>
            </div>
            <div className="card">
              <h3>🛰️ Satellite Data Integration</h3>
              <div className="alert alert-info">
                <strong>Live Satellite Feed:</strong><br />
                NASA MODIS and ISRO data showing active fire points in Punjab: 1,247 active fires detected
              </div>
              <div className="stats-grid">
                <div className="stat-item"><div className="stat-value">1,247</div><div className="stat-label">Active Fires (Punjab)</div></div>
                <div className="stat-item"><div className="stat-value">892</div><div className="stat-label">Active Fires (Haryana)</div></div>
              </div>
            </div>
            <div className="card">
              <h3>📡 IoT Sensor Network</h3>
              <div className="chart-container"><AQChart /></div>
              <p style={{ marginTop: 15, color: '#666' }}>245 IoT sensors deployed across Delhi-NCR providing real-time PM2.5, PM10, and NO2 measurements.</p>
            </div>
            <div className="card">
              <h3>🔄 Real-time Updates</h3>
              <div className="alert alert-warning">
                <strong>Latest Update (2 mins ago):</strong><br />
                Sharp increase in PM2.5 levels in East Delhi due to industrial emissions spike.
              </div>
              <button className="refresh-btn" onClick={refreshSources}>🔄 Update Source Data</button>
            </div>
          </div>
        )}
        {tab === 'policy' && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>📋 Intervention Effectiveness</h3>
              <div className="intervention-item"><h4>Odd-Even Policy (Oct 2024)</h4><p><strong>Impact:</strong> 18% reduction in vehicular PM2.5</p><p><strong>Cost-Benefit:</strong> ₹45 crores implementation cost, health benefit ₹180 crores</p></div>
              <div className="intervention-item"><h4>Construction Ban (Nov 2024)</h4><p><strong>Impact:</strong> 12% reduction in PM10 levels</p><p><strong>Economic Impact:</strong> ₹230 crores construction delay cost</p></div>
            </div>
            <div className="card">
              <h3>🤖 AI Policy Recommendations</h3>
              <div className="recommendation"><h4>🎯 Priority Recommendation</h4><p>Focus on stubble burning mitigation in Punjab. Deploy 500 additional happy seeders. Expected 25% AQI improvement with ₹80 crore investment.</p></div>
              <div className="recommendation"><h4>🚗 Secondary Recommendation</h4><p>Implement dynamic toll pricing on Ring Road during high pollution days. Expected 15% traffic reduction.</p></div>
            </div>
            <div className="card">
              <h3>📊 Policy Impact Visualization</h3>
              <div className="chart-container"><AQChart /></div>
            </div>
            <div className="card">
              <h3>📈 Real-time Analytics</h3>
              <div className="stats-grid">
                <div className="stat-item"><div className="stat-value">₹45L</div><div className="stat-label">Daily Health Cost</div></div>
                <div className="stat-item"><div className="stat-value">2.3M</div><div className="stat-label">People Affected</div></div>
                <div className="stat-item"><div className="stat-value">156</div><div className="stat-label">Hospital Admissions</div></div>
                <div className="stat-item"><div className="stat-value">78%</div><div className="stat-label">Policy Compliance</div></div>
              </div>
            </div>
            <div className="card">
              <h3>Readings</h3>
              <Readings />
            </div>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          <h3></h3>
          <HealthCheck />
        </div>
      </div>
    </div>
  )
}

function HealthCheck() {
  const [status, setStatus] = React.useState('loading...')
  React.useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setStatus(`${d.status} @ ${d.timestamp}`))
      .catch(() => setStatus('error'))
  }, [])
  return <pre>{status}</pre>
}

export default App
