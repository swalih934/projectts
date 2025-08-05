import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
<>
 



    <div className="container text-center mt-5 py-5 px-3">
  <h1 className="display-4 fw-bold mb-4">Welcome to Task Manager</h1>
  <p className="lead mb-5 text-muted">
    Manage your daily tasks efficiently and stay organized.
  </p>

  <div className="d-flex justify-content-center flex-wrap gap-3">
    <Link to="/task" className="btn btn-primary btn-lg px-4">
      Go to Tasks
    </Link>
    <a
      href="https://your-portfolio-link.com"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-secondary btn-lg px-4"
    >
      About
    </a>
  </div>
</div>

</>  )
}

export default Home