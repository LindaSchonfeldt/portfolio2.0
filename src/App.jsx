import { lazy, Suspense, useEffect, useState, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { HamburgerMenu } from './components/HamburgerMenu'
import Intro from './components/Intro'
import LoadingFallback from './components/LoadingFallback'
import { Nav } from './components/Nav'
import PerformanceMonitor from './components/PerformanceMonitor'
import { preloadRoute } from './utils/routePreloader'
import ScrollToTop from './components/ScrollToTop'
import { Footer } from './sections/Footer'
import GlobalStyle from './styles/GlobalStyle'

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`

function AppContent() {
  const [showIntro, setShowIntro] = useState(true)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const introPlayed = useRef(false)

  // Only show intro if on home and it hasn't played yet
  const shouldShowIntro = showIntro && isHome && !introPlayed.current

  const handleIntroComplete = () => {
    setShowIntro(false)
    introPlayed.current = true
  }

  // Preload routes when app loads for better navigation performance
  useEffect(() => {
    // Preload the most commonly visited pages after a short delay
    const timer = setTimeout(() => {
      if (location.pathname === '/') {
        // If on home, preload projects and contact
        preloadRoute('projects')
        preloadRoute('contact')
      } else if (location.pathname === '/projects') {
        // If on projects, preload home and contact
        preloadRoute('home')
        preloadRoute('contact')
      } else if (location.pathname === '/contact') {
        // If on contact, preload home and projects
        preloadRoute('home')
        preloadRoute('projects')
      }
    }, 1000) // Wait 1 second after initial load

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {shouldShowIntro ? (
          <Intro onComplete={handleIntroComplete} />
        ) : (
          <>
            <ScrollToTop />
            <Nav />
            <HamburgerMenu />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/contact' element={<Contact />} />
              </Routes>
              <Footer />
              <PerformanceMonitor />
            </Suspense>
          </>
        )}
      </AppContainer>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
