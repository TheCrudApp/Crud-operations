import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home'
import Details from './Components/Details/Details'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
       <Route path='/details' element={<Details/>}></Route>
    </Routes>
    
    </>
  )
}

export default App

