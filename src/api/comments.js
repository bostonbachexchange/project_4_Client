import apiUrl from '../apiConfig'
import axios from 'axios'

// export const getAllSongs = () => {
//     return axios(`${apiUrl}/songs`)
// }

// export const getOneSong = (id) => {
//     return axios(`${apiUrl}/songs/${id}`)
// }

export const createComment = (user, commentId, newComment) => {
    console.log('this is user', user)
    console.log('this is newComment', newComment)
	return axios({
		url: `${apiUrl}/comments/${commentId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: newComment},
	})
}


export const updateComment = (user, messageId, updatedComment) => {
    // console.log('this is user', user)
    console.log('this is updatedComment', updatedComment)
	return axios({
		url: `${apiUrl}/comments/${messageId}/${updatedComment._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: updatedComment},
	})
}

export const removeComment = (user, messageId, commentId) => {
    // console.log('here is the songId in delete', commentId)
    return axios({
        url: `${apiUrl}/comments/${messageId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}