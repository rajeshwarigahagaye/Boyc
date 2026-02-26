import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import './App.css'
import TopNav from './Layout/TopNav'
import Hero from './Hero/Hero'
import Home from './pages/Home/Home'
import MovieCriticDiary from './pages/Movies/MovieCriticDiary'
import Library from './pages/Library/Library'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <Router basename="/Boyc">
            <div className="landing-container">
              <TopNav />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add-review" element={<MovieCriticDiary />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
