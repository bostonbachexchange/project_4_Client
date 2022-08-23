import apiUrl from '../apiConfig'
import axios from 'axios'

export const getMessageBoard = () => {
    return axios(`${apiUrl}/messageboard`)
}

export const getOneMessage = (id) => {
    return axios(`${apiUrl}/messageboard/${id}`)
}

export const createMessage = (user, newMessage) => {
    console.log('this is user', user)
    console.log('this is newMessage', newMessage)
	return axios({
		url: apiUrl + '/messageboard',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { message: newMessage},
	})
}


export const updateMessage = (user, updatedMessage) => {
    // console.log('this is user', user)
    console.log('this is updatedMessage', updatedMessage)
	return axios({
		url: `${apiUrl}/messageboard/${updatedMessage._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { message: updatedMessage},
	})
}

export const removeMessage = (user, messageId) => {
    console.log('here is the messageId in delete', messageId)
    return axios({
        url: `${apiUrl}/messageboard/${messageId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}