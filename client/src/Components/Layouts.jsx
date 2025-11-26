import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Global/Header'
import Table from './Pages/Table'

function Layouts() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/Table' element={<Table/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default Layouts
