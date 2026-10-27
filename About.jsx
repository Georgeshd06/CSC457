function About() {
  return (
    <div className="about">
      <h1>About us</h1>
      <p className="lead">
        This project is a one-stop roster for elite athletes across F1, the NBA,
        MMA, boxing, soccer and the Lebanese Basketball League. Our mission is to
        give every champion a profile worthy of their numbers.
      </p>

      <h2>How it's built</h2>
      <div className="about-cards">
        <div className="about-card">
          <h3>Backend</h3>
          <p>Node.js and Express serving a REST API with an in-memory dataset.</p>
        </div>
        <div className="about-card">
          <h3>Frontend</h3>
          <p>A React single page app built with Vite and styled with plain CSS.</p>
        </div>
        <div className="about-card">
          <h3>Routing</h3>
          <p>React Router handles navigation between every view.</p>
        </div>
        <div className="about-card">
          <h3>State</h3>
          <p>Redux Toolkit centralizes the data and the API calls.</p>
        </div>
      </div>

      <h2>Our journey</h2>
      <div className="timeline">
        <div>
          <h3>Step 1 · The API</h3>
          <p>A bare-bones Express server with full CRUD routes.</p>
        </div>
        <div>
          <h3>Step 2 · The app</h3>
          <p>React views for listing, viewing, adding, editing and deleting athletes.</p>
        </div>
        <div>
          <h3>Step 3 · The polish</h3>
          <p>Validation, a gold theme and a smooth, responsive design.</p>
        </div>
      </div>
    </div>
  )
}

export default About