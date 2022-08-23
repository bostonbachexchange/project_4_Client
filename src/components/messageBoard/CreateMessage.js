import MessageBoardForm from '../shared/MessageBoardForm'
import { createMessage } from '../../api/messageboard'
import { useNavigate } from 'react-router-dom'
import { createMessageSuccess, createMessageFailure } from '../shared/AutoDismissAlert/messages'
import { useState } from 'react'
// import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider'

const CreateMessage = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    const [message, setMessageBoard] = useState({
        title: '',
		content: '',
        name: ''
    })
    console.log('this is message in createMessage', message)
    const handleChange = (e) => {
        setMessageBoard(prevMessage => {
            const updatedValue = e.target.value 
            const updatedName = e.target.name 
            const updatedMessage = {
                [updatedName]: updatedValue
            }
            return {
                ...prevMessage,
                ...updatedMessage,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createMessage(user, message)
            .then(res => { navigate(`/messageboard/${res.data.message}`)})
            // .then(res => console.log('this is the res from api call', res))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createMessageSuccess,
                    variant: 'success'
                })
            })
            .catch((error) => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createMessageFailure,
                    variant: 'danger'
                }))
    }

    return <MessageBoardForm message={message} handleSubmit={handleSubmit} handleChange={handleChange} />
}

export default CreateMessage