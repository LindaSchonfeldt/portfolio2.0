import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { HamburgerMenu } from './components/HamburgerMenu'
import LoadingFallback from './components/LoadingFallback'
import { Nav } from './components/Nav'
import PerformanceMonitor from './components/PerformanceMonitor'
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

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContainer>
        <Nav />
        <HamburgerMenu />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* Add more routes here as your site grows */}
            <Route path='/projects' element={<Projects />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
          </Routes>
        </Suspense>
        <Footer />
        <PerformanceMonitor />
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
