import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { HamburgerMenu } from './components/HamburgerMenu'
import { Nav } from './components/Nav'
import Home from './pages/Home'
import Projects from './pages/Projects'
import { Footer } from './sections/Footer'
import GlobalStyle from './styles/GlobalStyle'

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
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Add more routes here as your site grows */}
          <Route path='/projects' element={<Projects />} />
          {/* <Route path='/contact' element={<Contact />} /> */}
        </Routes>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
