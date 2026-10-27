import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteById, updateAthlete } from '../features/athletesSlice'
import AthleteForm from '../Components/AthleteForm'

function EditAthlete() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedAthlete, status, error } = useSelector((state) => state.athletes)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    dispatch(fetchAthleteById(id))
  }, [dispatch, id])

  if (status === 'failed') return <p>Error: {error}</p>
  if (!selectedAthlete || selectedAthlete.id !== Number(id)) {
    return <p>Loading...</p>
  }

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateAthlete({ id: Number(id), ...data })).unwrap()
      navigate(`/athletes/${id}`)
    } catch (err) {
      setServerError('Could not update the athlete. Is the backend running?')
    }
  }

  return (
    <div className="form-page">
      <h1>Edit athlete</h1>
      <AthleteForm
        initialData={selectedAthlete}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        serverError={serverError}
      />
    </div>
  )
}

export default EditAthlete