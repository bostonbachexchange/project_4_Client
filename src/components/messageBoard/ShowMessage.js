import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneMessage, updateMessage, removeMessage } from '../../api/messageboard'
import messages from '../shared/AutoDismissAlert/messages'
import { Button, Card, Container } from 'react-bootstrap'
// import EditSongModal from './EditSongModal'

const ShowMessage = (props) => {
    const [message, setSong] = useState(null)
    // const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { msgAlert, user } = props
    console.log('user in showSong', user)
    console.log('song in showSong', message)
    const navigate = useNavigate()

    useEffect(() => {
        getOneMessage(id)
            .then(res => setSong(res.data.message))
            .catch(err => {

                msgAlert({
                    heading: 'Error getting song',
                    message: messages.getMessageFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [updated])

    if (!message) {
        return <LoadingScreen />
    }

    const removeTheMessage = () => {
        removeMessage(user, message._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeMessageSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/songs')})
            .catch(err => {
                msgAlert({
                    heading: 'Error removing song',
                    message: messages.removeMessageFailure,
                    variant: 'danger'
                })
            })
    }
    // if (song.embedId) {
    //     let embededvideo = song.embedId
    // }
    return (
        <>
        <Container className='fluid'>
            <Card>
                <Card.Header>{ message.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>content {message.content}</small></div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {/* // this will show user the edit button if they 'own' the song, We want to make it so you can edit the song if you are an administrator */}
                    {
                        // song.owner && user && song.owner === user._id 
                        message.owner && user && message.owner._id === user._id 
                        ?
                        <>
                            {/* <Button onClick={() => setEditModalShow(true)}      className="m-2" variant="warning">
                            Edit Post
                            </Button> */}
                            <Button onClick={() => removeTheMessage()} className="m-2" variant="danger">
                                Delete Post
                            </Button>
                            {/* ADD A BUTTON TO ADD SONG TO PRACTICE LIST */}
                        </>
                    :
                    // in theory......
                    <p>Only an Admin can edit this song</p>
                    }
                </Card.Footer>
            </Card>
        </Container>
        {/* <EditSongModal 
            user={user}
            song={song}
            show={editModalShow}
            updateSong={updateSong}
            msgAlert={msgAlert}
            // triggerRefresh={() => setUpdated(prev = !prev)}
            handleClose={() => setEditModalShow(false)}
            /> */}
        </>
    )
}

export default ShowMessage