import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Footer, HamburgerMenu, LoadingScreen, Nav, PerformanceMonitor, ScrollToTop } from './components'
import GlobalStyle from './styles/GlobalStyle'
import { getRouteName, mainRoutes, preloadRoute } from './utils/routePreloader'

// Lazy loaded components
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy'))
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  padding-top: 40px;

  @media (min-width: 1024px) {
    padding-top: 40px;
  }
`

// sessionStorage can throw (private mode, blocked storage), so fail open
const INTRO_KEY = 'introSeen'

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

const markIntroSeen = () => {
  try {
    sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    // ignore
  }
}

function AppContent() {
  // Only show loading screen when the site is opened on home, once per
  // session, never when navigating to home later
  const [showIntro, setShowIntro] = useState(
    () => window.location.pathname === '/' && !hasSeenIntro()
  )
  const location = useLocation()

  const handleIntroComplete = useCallback(() => {
    markIntroSeen()
    setShowIntro(false)
  }, [])

  // Preload the current route immediately, then others on idle
  useEffect(() => {
    const currentRoute = getRouteName(location.pathname)
    if (currentRoute) preloadRoute(currentRoute)

    const preloadOthers = () => {
      mainRoutes
        .filter((route) => route !== currentRoute)
        .forEach(preloadRoute)
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preloadOthers)
      return () => cancelIdleCallback(id)
    } else {
      const timer = setTimeout(preloadOthers, 500)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {showIntro && <LoadingScreen onComplete={handleIntroComplete} />}
        <ScrollToTop />
        <Nav />
        <HamburgerMenu />
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:projectId' element={<ProjectCaseStudy />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          <Footer />
          <PerformanceMonitor />
        </Suspense>
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
