import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results ?? data.data ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Failed to load workouts: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  {workout.description && (
                    <p className="card-text text-muted">{workout.description}</p>
                  )}
                  {workout.exercises && workout.exercises.length > 0 && (
                    <ul className="list-group list-group-flush mb-2">
                      {workout.exercises.map((exercise, i) => (
                        <li key={i} className="list-group-item px-0 py-1 small">{exercise}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="card-footer text-muted small">
                  Duration: {workout.duration} min
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
