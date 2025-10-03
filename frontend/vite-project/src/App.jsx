import { BrowserRouter, Route, Router, Routes } from "react-router"
import Asistencia from "./components/Asistencia"

function App() {
  return (
    <BrowserRouter>
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Asistencia />} />
        <Route path="/tomar-asistencia" element={<Asistencia />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
