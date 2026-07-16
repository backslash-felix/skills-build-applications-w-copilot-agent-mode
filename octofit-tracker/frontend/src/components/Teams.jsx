import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results ?? data.data ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Failed to load teams: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found.</p>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">
                    {team.members?.length ?? 0} member{team.members?.length !== 1 ? 's' : ''}
                  </p>
                  {team.members && team.members.length > 0 && (
                    <ul className="list-unstyled mb-0">
                      {team.members.map((member, i) => (
                        <li key={i} className="small text-secondary">
                          {member?.username ?? member}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="card-footer text-muted small">
                  Created: {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
