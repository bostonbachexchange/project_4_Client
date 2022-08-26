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
		// url: apiUrl + '/uploads',
		url: apiUrl + '/create-song',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { song: newSong},
	})
}


export const updateSong = (user, updatedSong) => {
    // console.log('this is user', user)
    console.log('this is updatedSong', updatedSong)
	return axios({
		url: `${apiUrl}/songs/${updatedSong._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { song: updatedSong},
	})
}

export const addSongToUser = (user, songId) => {
	console.log('addSong to User in API was hit')
	return axios({
		url: `${apiUrl}/user/${songId}/${user._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const removeSong = (user, songId) => {
    console.log('here is the songId in delete', songId)
    return axios({
        url: `${apiUrl}/songs/${songId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}