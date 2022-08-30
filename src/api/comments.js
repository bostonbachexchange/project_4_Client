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
		url: `${apiUrl}/create-comments/${commentId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: newComment},
	})
}


export const updateComment = (user, messageId, commentID, comment) => {
    // console.log('this is user', user)
    console.log('this is comment', comment)
    console.log('this is updatedComment', commentID)
	return axios({
		url: `${apiUrl}/comments/${messageId}/${commentID}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: comment},
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