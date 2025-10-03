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
            <h1 className="text-3x1 font-bold p text-sky-950">asistentes?</h1>
            <div>
                { asistencia.map(asistente => (
                    <div key={asistente.id}>
                        <p>{asistente.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}