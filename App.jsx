import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AthleteDetail from "./pages/AthleteDetail"
import Navbar from "./Components/Navbar"
import About from "./pages/About"
import AddAthlete from "./pages/AddAthlete"
import EditAthlete from "./pages/EditAthlete"
import Contact from "./pages/Contact"
import AthleteList from "./pages/AthleteList"

function App() {
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    try {
      localStorage.setItem("theme", theme)
    } catch {
      // storage unavailable, the theme just won't persist
    }
  }, [theme])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/athletes" element={<AthleteList />} />
        <Route path="/athletes/:id" element={<AthleteDetail />} />
        <Route path="/athletes/new" element={<AddAthlete />} />
        <Route path="/athletes/:id/edit" element={<EditAthlete />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App