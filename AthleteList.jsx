import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthletes } from '../features/athletesSlice'
import {
  setSportFilter,
  setSearch,
  setActiveOnly,
  resetFilters,
} from '../features/uiSlice'
import AthleteCard from '../Components/AthleteCard'

const SPORTS = ['ALL', 'F1', 'NBA', 'MMA', 'Boxing', 'Soccer', 'LBL']

function AthleteList() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { athletes, status, error } = useSelector((state) => state.athletes)
  const { sportFilter, search, activeOnly } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchAthletes())
  }, [dispatch])

  useEffect(() => {
    const sportFromUrl = searchParams.get('sport')
    if (sportFromUrl && SPORTS.includes(sportFromUrl)) {
      dispatch(setSportFilter(sportFromUrl))
    }
  }, [dispatch, searchParams])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  const query = search.trim().toLowerCase()
  const filtered = athletes.filter((a) => {
    const matchesSport = sportFilter === 'ALL' || a.sport === sportFilter
    const matchesSearch =
      !query ||
      a.name.toLowerCase().includes(query) ||
      a.country.toLowerCase().includes(query)
    const matchesActive = !activeOnly || a.isActive
    return matchesSport && matchesSearch && matchesActive
  })

  return (
    <div>
      <div className="filters">
        <div className="tabs">
          {SPORTS.map((sport) => (
            <button
              key={sport}
              className={sportFilter === sport ? 'tab active' : 'tab'}
              onClick={() => dispatch(setSportFilter(sport))}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by name or country..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <label className="toggle">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => dispatch(setActiveOnly(e.target.checked))}
            />
            Active only
          </label>
        </div>

        <p className="muted">
          Showing {filtered.length} of {athletes.length} athletes
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <h2>No athletes found</h2>
          <p>Try a different filter or search.</p>
          <button className="btn" onClick={() => dispatch(resetFilters())}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="athlete-grid">
          {filtered.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AthleteList