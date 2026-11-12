import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Layout from './layout'
import Summary from "./pages/article-summary"
import { Route, Routes } from 'react-router-dom'
import Saved from './pages/Saved'
function App() {
  return (
    <>
    <Navbar/>
    <Routes> 
      <Route path='/' element={<Layout/>}>
        <Route index element={<Hero/>}/>
        <Route path='/saved' element={<Saved/>}/>
      </Route>
      <Route path='/summary' element={<Summary/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
