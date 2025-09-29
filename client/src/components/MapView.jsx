import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView() {
  const mapRef = React.useRef(null)
  React.useEffect(() => {
    if (mapRef.current) return
    const map = L.map('map', { center: [28.6139, 77.2090], zoom: 9 })
    mapRef.current = map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)
    L.marker([28.6139, 77.2090]).addTo(map).bindPopup('Delhi').openPopup()
  }, [])
  return (
    <div id="map" style={{ height: 400, width: '100%', borderRadius: 8, border: '1px solid #ddd' }} />
  )
}


