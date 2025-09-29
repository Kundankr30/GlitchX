import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView() {
  const mapRef = React.useRef(null)
  React.useEffect(() => {
    if (mapRef.current) return
    const map = L.map('map', { center: [28.6139, 77.2090], zoom: 10 })
    mapRef.current = map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    function classifyAQI(value) {
      if (value <= 50) return { label: 'Good', short: 'Good' }
      if (value <= 100) return { label: 'Moderate', short: 'Moderate' }
      if (value <= 200) return { label: 'Unhealthy', short: 'Unhealthy' }
      return { label: 'Hazardous', short: 'Hazardous' }
    }

    // Sample AQI values (you can replace with API-fed data)
    const places = [
      { name: 'Connaught Place', coords: [28.6315, 77.2167], aqi: 186 },
      { name: 'Noida', coords: [28.5355, 77.3910], aqi: 172 },
      { name: 'Gurugram', coords: [28.4595, 77.0266], aqi: 160 },
      { name: 'Ghaziabad', coords: [28.6692, 77.4538], aqi: 210 },
      { name: 'Faridabad', coords: [28.4089, 77.3178], aqi: 155 },
      { name: 'Dwarka', coords: [28.5921, 77.0460], aqi: 120 },
      { name: 'Rohini', coords: [28.7360, 77.1130], aqi: 130 },
      { name: 'Saket', coords: [28.5245, 77.2066], aqi: 115 },
      { name: 'Lajpat Nagar', coords: [28.5677, 77.2433], aqi: 145 },
    ]

    places.forEach(p => {
      const marker = L.marker(p.coords).addTo(map)
      const meta = classifyAQI(p.aqi)
      const popupLabel = `AQI ${p.aqi} (${meta.short})`
      marker.bindPopup(popupLabel)
      marker.bindTooltip(p.name, { permanent: true, direction: 'top', offset: [0, -10], className: 'place-label' }).openTooltip()
    })
  }, [])
  return (
    <div id="map" style={{ height: 400, width: '100%', borderRadius: 8, border: '1px solid #ddd' }} />
  )
}


