import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneMessage, updateMessage, removeMessage } from '../../api/messageboard'
import { removeComment } from '../../api/comments'
import messages from '../shared/AutoDismissAlert/messages'
import { Button, Card, Container } from 'react-bootstrap'
import EditMessageModal from './EditMessageModal'
import NewCommentModal from '../comments/NewCommentModal'

const ShowMessage = (props) => {
    const [message, setMessage] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { msgAlert, user } = props
    console.log('user in showMessage', user)
    console.log('message in showMessage', message)
    const navigate = useNavigate()

    useEffect(() => {
        getOneMessage(id)
            .then(res => setMessage(res.data.message))
            .catch(err => {

                msgAlert({
                    heading: 'Error getting Message',
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
            .then(() => {navigate('/messageboard')})
            .catch(err => {
                msgAlert({
                    heading: 'Error removing message',
                    message: messages.removeMessageFailure,
                    variant: 'danger'
                })
            })
    }
    const removeTheComment = () => {
        removeMessage(user, message._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeMessageSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate(`/messageboard/${message._id}`)})
            .catch(err => {
                msgAlert({
                    heading: 'Error removing message',
                    message: messages.removeMessageFailure,
                    variant: 'danger'
                })
            })
    }
    // if (song.embedId) {
    //     let embededvideo = song.embedId
    // }
    const commentList = message.comments.map(cmt => 
        <>
            <p>{cmt.content} <span>
                <Button onClick={() => removeTheComment()} className="m-2 " variant="danger" > 🗑 </Button>                     
                </span></p>   
        </>
        ) 
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
                        <div><small>{commentList}</small></div>
                    </Card.Footer>
                <Card.Footer>
                    <Button onClick={()=> setCommentModalShow(true)} className='m-2' variant='info'>Post a comment</Button>
                    {/* // this will show user the edit button if they 'own' the song, We want to make it so you can edit the song if you are an administrator */}
                    {
                    // song.owner && user && song.owner === user._id 
                    message.owner && user && message.owner._id === user._id 
                    ?
                        <>
                            <Button onClick={() => setEditModalShow(true)}      className="m-2" variant="warning">
                            Edit Post
                            </Button>
                            <Button onClick={() => removeTheMessage()} className="m-2" variant="danger">
                                Delete Post
                            </Button>
                            {/* ADD A BUTTON TO ADD SONG TO PRACTICE LIST */}
                        </>
                    :
                    // in theory......
                    <p>you cannot edit this message</p>
                    }
                </Card.Footer>
            </Card>
        </Container>
        <EditMessageModal 
            user={user}
            message={message}
            show={editModalShow}
            updateMessage={updateMessage}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(updated => !updated)}
            handleClose={() => setEditModalShow(false)}
        />
        <NewCommentModal 
            message={message}
            show={commentModalShow}
            user={user}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(updated => !updated)}
            handleClose={() => setCommentModalShow(false)}
        />
        </>
    )
}

export default ShowMessage