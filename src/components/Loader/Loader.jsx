import { RotatingLines } from  'react-loader-spinner'
import { Container } from './Loader.styled'

export const Loader = () => {
  return (
    <Container >
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
  </Container>
  )
}
