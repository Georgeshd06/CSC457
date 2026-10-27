import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/uiSlice'

function Navbar() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/athletes">Athletes</NavLink></li>
        <li><NavLink to="/athletes/new">Add Athlete</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li className="nav-spacer">
          <button
            className="theme-toggle"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Switch color mode"
          >
            {theme === 'light' ? ' Black & Gold' : ' White & Gold'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar