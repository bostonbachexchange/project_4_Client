import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import SongForm from "../shared/SongForm";
import { updateSongSuccess, updateSongFailure } from '../shared/AutoDismissAlert/messages'

const EditSongModal = (props) => {
    const { user, show, handleClose, updateSong, msgAlert, triggerRefresh } = props
    const [song, setSong] = useState(props.song)

    console.log(song)
    const handleChange = (e) => {
        setSong(prevSong => {
            const updatedValue = e.target.value 
            const updatedName = e.target.name 
            const updatedSong = {
                [updatedName]: updatedValue
            }
            return {
                ...prevSong,
                ...updatedSong
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateSong(user, song)
            .then(() => handleClose())
            // .then(res => console.log('this is the res from api call', res))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateSongSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateSongFailure,
                    variant: 'danger'
                }))
    }    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SongForm song={song} handleChange={handleChange} handleSubmit={handleSubmit} heading="Update Song" />
            </Modal.Body>
        </Modal>
    )
}

 export default EditSongModal