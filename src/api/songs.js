import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllSongs = () => {
    return axios(`${apiUrl}/songs`)
}

export const getOneSong = (id) => {
    return axios(`${apiUrl}/songs/${id}`)
}