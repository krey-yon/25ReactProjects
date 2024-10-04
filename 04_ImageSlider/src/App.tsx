import './App.css'
import Slider from './components/Slider'

function App() {

  return (
    <>
      <Slider url={"https://picsum.photos/v2/list"} limit={5} page={1} />
    </>
  )
}

export default App
