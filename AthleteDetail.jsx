import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteById, deleteAthlete } from '../features/athletesSlice'
import { imageSrc } from '../config'
import ConfirmModal from '../Components/ConfirmModal'

function AthleteDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedAthlete, status, error } = useSelector((state) => state.athletes)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    dispatch(fetchAthleteById(id))
  }, [dispatch, id])

  if (status === 'failed') return <p>Error: {error}</p>
  if (!selectedAthlete || selectedAthlete.id !== Number(id)) {
    return <p>Loading...</p>
  }

  const athlete = selectedAthlete

  const handleDelete = async () => {
    try {
      await dispatch(deleteAthlete(athlete.id)).unwrap()
      navigate('/athletes')
    } catch (err) {
      setShowConfirm(false)
      setDeleteError('Could not delete the athlete. Is the backend running?')
    }
  }

  return (
    <div className="athlete-detail">
      <img src={imageSrc(athlete.image)} alt={athlete.name} />
      <div>
        <span className="badge">{athlete.sport}</span>
        <h1>{athlete.name}</h1>
        <p>Country: {athlete.country}</p>
        <p>Born: {athlete.birthDate}</p>
        <p>Titles: {athlete.titles}</p>
        <p>Status: {athlete.isActive ? 'Active' : 'Retired'}</p>

        <h2>Achievements</h2>
        <ul>
          {athlete.achievements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {deleteError && <p className="error">{deleteError}</p>}

        <div className="detail-actions">
          <Link to={`/athletes/${athlete.id}/edit`} className="btn">Edit</Link>
          <button className="btn danger" onClick={() => setShowConfirm(true)}>Delete</button>
          <Link to="/athletes">Back to list</Link>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete this athlete?"
          message={`${athlete.name} will be removed from the roster. This cannot be undone.`}
          confirmLabel="Yes, delete"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default AthleteDetail