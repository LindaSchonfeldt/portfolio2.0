import { lazy, Suspense, useState } from 'react'
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

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`

import { useRef } from 'react'

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

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {/*         {shouldShowIntro ? (
          <Intro onComplete={handleIntroComplete} />
        ) : ( */}
        <>
          <ScrollToTop />
          <Nav />
          <HamburgerMenu />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects' element={<Projects />} />
              {/* <Route path='/contact' element={<Contact />} /> */}
            </Routes>
          </Suspense>
          <Footer />
          <PerformanceMonitor />
        </>
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
