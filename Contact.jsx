import { useState } from 'react'

const emptyForm = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.subject.trim()) {
    errors.subject = 'Subject is required'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  return errors
}

function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setSent(false)
  }

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      setTouched({ name: true, email: true, subject: true, message: true })
      return
    }
    console.log('Contact message:', values)
    setSent(true)
    setValues(emptyForm)
    setTouched({})
  }

  const showError = (field) => touched[field] && errors[field]

  return (
    <div className="form-page">
      <h1>Contact us</h1>
      <p className="muted">Questions, feedback or an athlete we should add? Send us a message.</p>

      {sent && <p className="success">Thanks! Your message has been sent.</p>}

      <form className="athlete-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError('name') && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError('email') && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Subject
          <input
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError('subject') && <span className="error">{errors.subject}</span>}
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="counter">{values.message.length} characters</span>
          {showError('message') && <span className="error">{errors.message}</span>}
        </label>

        <button type="submit" className="btn" disabled={!isValid}>
          Send message
        </button>
      </form>
    </div>
  )
}

export default Contact