import styled from 'styled-components'

export const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`
