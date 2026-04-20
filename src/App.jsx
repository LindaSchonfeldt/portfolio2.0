import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Footer, HamburgerMenu, LoadingScreen, Nav, PerformanceMonitor, ScrollToTop } from './components'
import GlobalStyle from './styles/GlobalStyle'
import { preloadRoute } from './utils/routePreloader'

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

function AppContent() {
  // Disable intro animation for better performance
  // Set to true to enable the intro animation
  const [showIntro, setShowIntro] = useState(true)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const introPlayed = useRef(false)

  // Only show loading screen on home, first visit only
  const shouldShowIntro = showIntro && isHome && !introPlayed.current

  const handleIntroComplete = () => {
    setShowIntro(false)
    introPlayed.current = true
  }

  // Preload the current route immediately, then others on idle
  useEffect(() => {
    preloadRoute(location.pathname === '/' ? 'home' : location.pathname === '/projects' ? 'projects' : 'contact')

    const preloadOthers = () => {
      if (location.pathname === '/') {
        preloadRoute('projects')
        preloadRoute('contact')
      } else if (location.pathname === '/projects') {
        preloadRoute('home')
        preloadRoute('contact')
      } else {
        preloadRoute('home')
        preloadRoute('projects')
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadOthers)
    } else {
      const timer = setTimeout(preloadOthers, 500)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {shouldShowIntro && <LoadingScreen onComplete={handleIntroComplete} />}
        <ScrollToTop />
        <Nav />
        <HamburgerMenu />
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:projectId' element={<ProjectCaseStudy />} />
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
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppContent />
    </BrowserRouter>
  )
}

export default App
