import { Link } from 'react-router-dom'
import { imageSrc } from '../config'

function AthleteCard({ athlete }) {
  return (
    <div className="athlete-card">
      <img src={imageSrc(athlete.image)} alt={athlete.name} />
      <span className="badge">{athlete.sport}</span>
      <h3>{athlete.name}</h3>
      <p>{athlete.country}</p>
      <p>Titles: {athlete.titles}</p>
      <p>{athlete.isActive ? 'Active' : 'Retired'}</p>
      <Link to={`/athletes/${athlete.id}`}>View profile</Link>
    </div>
  )
}

export default AthleteCard