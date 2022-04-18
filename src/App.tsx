import React from 'react'
import { BrowserRouter as Router,Route, Link ,Routes} from 'react-router-dom'
import { Navigation } from './components/Navigation'
import Create from './pages/Create'
import Detail from './pages/Detail'
import Home from './pages/Home'

export const App=()=>{
    return(
         <div>
             <Router>
                 <Navigation/>
                 <Routes>
                     <Route exact path={"/"} element={<Home/>} />
                     <Route exact path={"/detail"}  element={<Detail/>} />
                     <Route exact path={"/create"}element={<Create/>}   />
                 </Routes>
             </Router>
         </div>
    )
}