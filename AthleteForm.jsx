import { useState } from 'react'
import { imageSrc } from '../config'

const SPORTS = ['F1', 'NBA', 'MMA', 'Boxing', 'Soccer', 'LBL']

const emptyForm = {
  name: '',
  sport: '',
  country: '',
  birthDate: '',
  titles: '0',
  isActive: true,
  image: '',
  achievements: '',
}

function toFormValues(athlete) {
  if (!athlete) return emptyForm
  return {
    name: athlete.name,
    sport: athlete.sport,
    country: athlete.country,
    birthDate: athlete.birthDate,
    titles: String(athlete.titles),
    isActive: athlete.isActive,
    image: athlete.image,
    achievements: athlete.achievements.join(', '),
  }
}

function toList(text) {
  return text.split(',').map((item) => item.trim()).filter(Boolean)
}

function readAndResize(file, maxSize = 600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  if (!values.sport) {
    errors.sport = 'Choose a sport'
  }
  if (!values.country.trim()) {
    errors.country = 'Country is required'
  }
  if (!values.birthDate) {
    errors.birthDate = 'Birth date is required'
  } else if (new Date(values.birthDate) > new Date()) {
    errors.birthDate = 'Birth date cannot be in the future'
  }
  const titles = Number(values.titles)
  if (values.titles === '' || !Number.isInteger(titles) || titles < 0) {
    errors.titles = 'Titles must be a whole number, 0 or more'
  }
  if (!values.image) {
    errors.image = 'A photo is required'
  }
  if (toList(values.achievements).length === 0) {
    errors.achievements = 'Add at least one achievement'
  }
  return errors
}

function AthleteForm({ initialData, onSubmit, submitLabel, serverError }) {
  const [values, setValues] = useState(toFormValues(initialData))
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value })
  }

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please choose an image file' }))
      return
    }
    try {
      const dataUrl = await readAndResize(file)
      setValues((prev) => ({ ...prev, image: dataUrl }))
      setErrors((prev) => ({ ...prev, image: undefined }))
    } catch {
      setErrors((prev) => ({ ...prev, image: 'Could not read that image' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      name: values.name.trim(),
      sport: values.sport,
      country: values.country.trim(),
      birthDate: values.birthDate,
      isActive: values.isActive,
      titles: Number(values.titles),
      image: values.image,
      achievements: toList(values.achievements),
    })
  }

  return (
    <form className="athlete-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input name="name" value={values.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Sport
        <select name="sport" value={values.sport} onChange={handleChange}>
          <option value="">Select a sport</option>
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
        {errors.sport && <span className="error">{errors.sport}</span>}
      </label>

      <label>
        Country
        <input name="country" value={values.country} onChange={handleChange} />
        {errors.country && <span className="error">{errors.country}</span>}
      </label>

      <label>
        Birth date
        <input type="date" name="birthDate" value={values.birthDate} onChange={handleChange} />
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </label>

      <label>
        Titles
        <input type="number" name="titles" min="0" value={values.titles} onChange={handleChange} />
        {errors.titles && <span className="error">{errors.titles}</span>}
      </label>

      <label>
        Photo
        <input type="file" accept="image/*" onChange={handleImage} />
        {values.image && (
          <img className="preview" src={imageSrc(values.image)} alt="Preview" />
        )}
        {errors.image && <span className="error">{errors.image}</span>}
      </label>

      <label>
        Achievements (separate with commas)
        <input name="achievements" value={values.achievements} onChange={handleChange} />
        {errors.achievements && <span className="error">{errors.achievements}</span>}
      </label>

      <label className="checkbox">
        <input type="checkbox" name="isActive" checked={values.isActive} onChange={handleChange} />
        Currently active
      </label>

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" className="btn">{submitLabel}</button>
    </form>
  )
}

export default AthleteForm