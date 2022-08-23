import SongForm from '../shared/SongForm'
import { createSong } from '../../api/songs'
import { useNavigate } from 'react-router-dom'
import { createSongSuccess, createSongFailure } from '../shared/AutoDismissAlert/messages'
import { useState } from 'react'
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider'

const CreateSong = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    const [song, setSong] = useState({
        title: '',
        composer:  '',
        lyricist: '',
        type: '',
        lyrics:'',
        scorePDF:'',
        recordings:'',
        embedId: ''
    })
    console.log('this is song in createSong', song)
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

        createSong(user, song)
            .then(res => { navigate(`/songs/${res.data.song._id}`)})
            // .then(res => console.log('this is the res from api call', res))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createSongSuccess,
                    variant: 'success'
                })
            })
            .catch((error) => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createSongFailure,
                    variant: 'danger'
                }))
    }

    return <SongForm song={ song } handleSubmit={ handleSubmit } handleChange={ handleChange } />
}

export default CreateSong