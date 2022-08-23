import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllSongs = () => {
    return axios(`${apiUrl}/songs`)
}

export const getOneSong = (id) => {
    return axios(`${apiUrl}/songs/${id}`)
}

export const createSong = (user, newSong) => {
    console.log('this is user', user)
    console.log('this is newSong', newSong)
	return axios({
		url: apiUrl + '/create-song',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { song: newSong},
	})
}
