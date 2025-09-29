import React from 'react'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

export default function AQChart() {
  const canvasRef = React.useRef(null)
  React.useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'AQI',
            data: [180, 210, 160, 200, 240, 190, 220],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Weekly AQI (sample)' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })
    return () => chart.destroy()
  }, [])
  return <canvas ref={canvasRef} height={120} />
}


