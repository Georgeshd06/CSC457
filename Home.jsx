import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthletes } from '../features/athletesSlice'
import AthleteCard from '../Components/AthleteCard'

const SPORTS = ['F1', 'NBA', 'MMA', 'Boxing', 'Soccer', 'LBL']

function Home() {
  const dispatch = useDispatch()
  const { athletes } = useSelector((state) => state.athletes)

  useEffect(() => {
    dispatch(fetchAthletes())
  }, [dispatch])

  const totalTitles = athletes.reduce((sum, a) => sum + a.titles, 0)
  const activeCount = athletes.filter((a) => a.isActive).length
  const featured = athletes.reduce(
    (best, a) => (!best || a.titles > best.titles ? a : best),
    null
  )

  return (
    <div>
      <section className="hero">
        <h1>
          Where legends <span>are logged.</span>
        </h1>
        <p>
          One roster for the fastest, strongest and most decorated athletes in
          the world. Browse, add and manage them all in one place.
        </p>
        <Link to="/athletes" className="btn">Browse the roster</Link>
      </section>

      <section className="stats">
        <div className="stat">
          <strong>{athletes.length}</strong>
          <span>Athletes</span>
        </div>
        <div className="stat">
          <strong>{totalTitles}</strong>
          <span>Total titles</span>
        </div>
        <div className="stat">
          <strong>{activeCount}</strong>
          <span>Active now</span>
        </div>
      </section>

      <section className="home-section">
        <h2>Browse by sport</h2>
        <div className="sport-tiles">
          {SPORTS.map((sport) => (
            <Link key={sport} to={`/athletes?sport=${sport}`} className="sport-tile">
              <strong>{sport}</strong>
              <span>
                {athletes.filter((a) => a.sport === sport).length} athletes
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featured && (
        <section className="home-section">
          <h2>Most decorated athlete</h2>
          <div className="featured">
            <AthleteCard athlete={featured} />
          </div>
        </section>
      )}
    </div>
  )
}

export default Home