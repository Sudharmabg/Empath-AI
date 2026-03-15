import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhyEmpathAI from './components/WhyEmpathAI'
import HowItWorks from './components/HowItWorks'
import InclusivityFocus from './components/InclusivityFocus'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/admin/AdminPanel'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      if (parsedUser.role === 'admin' || parsedUser.email === 'admin@empathai.com') {
        setCurrentPage('admin')
      } else {
        setCurrentPage('dashboard')
      }
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [currentPage])

  const navigateToAuth = () => {
    setShowLoginModal(true)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    if (userData.role === 'admin' || userData.email === 'admin@empathai.com') {
      setCurrentPage('admin')
    } else {
      setCurrentPage('dashboard')
    }
    setShowLoginModal(false)
  }

  const navigateToHome = () => {
    setCurrentPage('home')
  }

  const navigateToDashboard = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    if (userData.role === 'admin' || userData.email === 'admin@empathai.com') {
      setCurrentPage('admin')
    } else {
      setCurrentPage('dashboard')
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setCurrentPage('home')
  }

  if (currentPage === 'auth') {
    return <Auth onBackToHome={navigateToHome} onLoginSuccess={navigateToDashboard} />
  }

  if (currentPage === 'admin' && user) {
    return <AdminPanel onLogout={handleLogout} />
  }

  if (currentPage === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Header />
      <main>
        <Hero onStartJourney={navigateToAuth} />
        <div className="reveal">
          <WhyEmpathAI />
        </div>
        <div className="reveal">
          <HowItWorks />
        </div>
        <div className="reveal">
          <InclusivityFocus />
        </div>
      </main>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App