import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { HamburgerMenu } from './components/HamburgerMenu'
import Intro from './components/Intro'
import LoadingFallback from './components/LoadingFallback'
import { Nav } from './components/Nav'
import PerformanceMonitor from './components/PerformanceMonitor'
import ScrollToTop from './components/ScrollToTop'
import { Footer } from './sections/Footer'
import GlobalStyle from './styles/GlobalStyle'
import { preloadRoute } from './utils/routePreloader'

// Lazy loaded components
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`

function AppContent() {
  // Disable intro animation for better performance
  // Set to true to enable the intro animation
  const [showIntro, setShowIntro] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const introPlayed = useRef(true) // Start as true to skip intro

  // Only show intro if on home and it hasn't played yet
  const shouldShowIntro = showIntro && isHome && !introPlayed.current

  const handleIntroComplete = () => {
    setShowIntro(false)
    introPlayed.current = true
  }

  // Preload routes when app loads for better navigation performance
  useEffect(() => {
    // Preload the most commonly visited pages using requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (location.pathname === '/') {
          preloadRoute('projects')
          preloadRoute('contact')
        } else if (location.pathname === '/projects') {
          preloadRoute('home')
          preloadRoute('contact')
        } else if (location.pathname === '/contact') {
          preloadRoute('home')
          preloadRoute('projects')
        }
      })
    } else {
      // Fallback with reduced delay
      const timer = setTimeout(() => {
        if (location.pathname === '/') {
          preloadRoute('projects')
          preloadRoute('contact')
        } else if (location.pathname === '/projects') {
          preloadRoute('home')
          preloadRoute('contact')
        } else if (location.pathname === '/contact') {
          preloadRoute('home')
          preloadRoute('projects')
        }
      }, 500)
      return () => clearTimeout(timer)
    }
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
