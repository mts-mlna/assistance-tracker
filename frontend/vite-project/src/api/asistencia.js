import axios from 'axios'

const asistenciaApi = axios.create({
    baseURL: 'http://localhost:8000/api/asistencia/',
})

export const getAsistencia = () => asistenciaApi.get()