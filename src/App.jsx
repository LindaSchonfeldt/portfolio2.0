import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Nav } from './components/Nav'
import Home from './pages/Home'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
