import { useEffect, useState } from "react"
import { getAsistencia } from "../api/asistencia"

export default function asistencia() {

    const [asistencia, setAsistencia] = useState([])

    const loadAsistencia = async () => {
        const response = await getAsistencia()
        setAsistencia(response.data)
    }

    useEffect(() => {
        loadAsistencia()
    }, [])

    loadAsistencia()
    return (
        <div>
        </div>
    )
}