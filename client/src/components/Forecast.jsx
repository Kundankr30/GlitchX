import React from 'react'

export default function Forecast() {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)

  function run() {
    setLoading(true)
    fetch('/api/forecast')
      .then(r => r.json())
      .then(d => setResult(d))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <button onClick={run} disabled={loading}>{loading ? 'Running...' : 'Run Forecast (python)'}</button>
      {result && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}


