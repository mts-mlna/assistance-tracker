import { BrowserRouter, Route, Router, Routes } from "react-router"
import Asistencia from "./components/Asistencia"
import Header from "./components/Header"
import Home from "./components/Home"

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Home />
    </div>
    </BrowserRouter>
  )
}

export default App
