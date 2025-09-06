import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Nav } from './components/Nav'
import { HamburgerMenu } from './components/HamburgerMenu'
import Home from './pages/Home'
import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
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
          {/* <Route path='/projects' element={<Projects />} /> */}
          {/* <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
