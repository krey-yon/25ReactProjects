import './App.css'
import menus from './Components/Data'
import TreeView from './Components/TreeView'

function App() {

  return (
    <>
    <TreeView menus={menus} />
    </>
  )
}

export default App
