import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import CommentForm from "../shared/CommentForm";
import { createComment } from '../../api/comments'
// import { updateMessageSuccess, updateMessageFailure } from '../shared/AutoDismissAlert/messages'

const NewCommentModal = (props) => {
    const { user, message, show, handleClose, msgAlert, triggerRefresh } = props
    const [comment, setComment] = useState({})

    console.log('comment in NewComment', comment)
    
    const handleChange = (e) => {
        setComment(prevComment => {
            const value = e.target.value 
            const name = e.target.name 

            const updatedComment = {
                [name]: value
            }
            return {
                ...prevComment,
                ...updatedComment
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createComment(user, message._id, comment)
            .then(() => comment.owner = user._id)
            .then(() => handleClose())
            // .then(res => console.log('this is the res from api call', res))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: "Great!, Nice Comment",
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                }))
    }    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                {/* <CommentForm comment={comment} handleChange={handleChange} handleSubmit={handleSubmit} heading="Post a Comment" /> */}
            </Modal.Body>
        </Modal>
    )
}

 export default NewCommentModal