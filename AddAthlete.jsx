import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addAthlete } from '../features/athletesSlice'
import AthleteForm from '../Components/AthleteForm'

function AddAthlete() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (data) => {
    try {
      await dispatch(addAthlete(data)).unwrap()
      navigate('/athletes')
    } catch (err) {
      setServerError('Could not add the athlete. Is the backend running?')
    }
  }

  return (
    <div className="form-page">
      <h1>Add athlete</h1>
      <AthleteForm
        onSubmit={handleSubmit}
        submitLabel="Add athlete"
        serverError={serverError}
      />
    </div>
  )
}

export default AddAthlete