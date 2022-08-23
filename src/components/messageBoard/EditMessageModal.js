import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import MessageBoardForm from "../shared/MessageBoardForm";
import { updateMessageSuccess, updateMessageFailure } from '../shared/AutoDismissAlert/messages'

const EditMessageModal = (props) => {
    const { user, show, handleClose, updateMessage, msgAlert, triggerRefresh } = props
    const [message, setMessage] = useState(props.message)

    console.log(message)
    const handleChange = (e) => {
        setMessage(prevMessage => {
            const updatedValue = e.target.value 
            const updatedName = e.target.name 
            const updatedMessage = {
                [updatedName]: updatedValue
            }
            return {
                ...prevMessage,
                ...updatedMessage
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateMessage(user, message)
            .then(() => handleClose())
            // .then(res => console.log('this is the res from api call', res))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateMessageSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateMessageFailure,
                    variant: 'danger'
                }))
    }    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MessageBoardForm message={message} handleChange={handleChange} handleSubmit={handleSubmit} heading="Update Post" />
            </Modal.Body>
        </Modal>
    )
}

 export default EditMessageModal