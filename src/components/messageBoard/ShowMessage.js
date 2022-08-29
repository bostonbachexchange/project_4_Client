import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneMessage, updateMessage, removeMessage } from '../../api/messageboard'
import { removeComment } from '../../api/comments'
import messages from '../shared/AutoDismissAlert/messages'
import { Button, Card, Container } from 'react-bootstrap'
import EditMessageModal from './EditMessageModal'
import NewCommentModal from '../comments/NewCommentModal'
import EditCommentModal from '../comments/EditCommentModal'

const ShowMessage = (props) => {
    const [message, setMessage] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { msgAlert, user, comment, triggerRefresh } = props
    console.log('user in showMessage', user)
    // console.log('message in showMessage', message)
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
            .then(() => {navigate(`/messageboard`)})
            .catch(err => {
                msgAlert({
                    heading: 'Error removing message',
                    message: messages.removeMessageFailure,
                    variant: 'danger'
                })
            })
    }

    const removeTheComment = (cmt) => {
        console.log("!!!!", cmt)
        removeComment(user, message._id, cmt._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCommentSuccess,
                    variant: 'success'
                })
            })
            .then(() => setUpdated(!updated))
            .catch(err => {
                msgAlert({
                    heading: 'Error removing message',
                    message: messages.removeCommentFailure,
                    variant: 'danger'
                })
            })
    }

    const commentList = message.comments.map(cmt => 
        <Card className='m-2 p-0'>
            <Card.Body className='p-0'>
                <p className='m-2 p-0'><strong>{cmt.content}</strong></p>
                <hr></hr>
                <p className='m-2 p-0'>from <em>{cmt.owner.email}</em></p>
                <hr></hr>
            </Card.Body>
            {cmt.owner && user && cmt.owner._id === user._id 
                ?
                <>
                    <div className='text-center p-0 m-0'>
                        <Button onClick={() => EditCommentModal()} className="m-2 p-0" variant="info" > Edit📝 </Button>                
                        <Button onClick={() => removeTheComment(cmt)} className="m-2 p-0" variant="danger" > Delete🗑 </Button>                     
                    </div>
                </>
                :
                null
            }  
        </Card>
        ) 

    return (
        <>
        <Container className='fluid playFont'>
            <Card className="m-2">
                <Card.Header  className='text-center'>
                    <h1><strong>{ message.title}</strong></h1>
                    <span><small>from <em>{message.owner.email}</em></small></span>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='text-center m-2'>
                        <>{message.content}</>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='p-4'>
                    <div><small>{commentList}</small></div>
                </Card.Footer>
                <Card.Footer className='p-0 text-center'>
                    <Button 
                        onClick={()=> setCommentModalShow(true)} 
                        className='m-2' 
                        variant='info'
                    >
                            Post a comment
                    </Button>

                    {
                    message.owner && user && message.owner._id === user._id 
                    ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Post
                            </Button>
                            <Button onClick={() => removeTheMessage()} className="m-2" variant="danger">
                                Delete Post
                            </Button>
                        </>
                    :
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
        <EditCommentModal 
            user={user}
            message={message}
            comment={comment}
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            msgAlert={msgAlert}
            triggerRefresh={triggerRefresh}
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