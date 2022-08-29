import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getMessageBoard } from '../../api/messageboard'
import messages from '../shared/AutoDismissAlert/messages'
import CommentForm from '../shared/CommentForm'


const MessageBoardIndex = (props) => {
    const [messageboard, setMessageBoard] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props
    useEffect(() => {
        getMessageBoard()
            // .then(res => console.log('res.data.messageboard', res.data.messageboard))
            .then(res => setMessageBoard(res.data.messageboard))
            .catch(err => {
                // console.log(err)
                msgAlert({
                    heading: 'Error Getting Messages',
                    message: messages.getMessageFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])
    if (error) {
        return <p>Error!</p>
    }
    if (!messageboard) {
        return <LoadingScreen />
    } else if (messageboard.length === 0) {
        return <p>No Posts yet. Say Hello!.</p>
    }

    const messageboardCards = messageboard.map(messagepost =>
        <>
        <Card key={messagepost._id} className='m-2 playFont'>
        {/* <Card key={message._id} className='m-2'> */}
            <Card.Header><strong>{messagepost.title}</strong> by <em>{messagepost.owner.email}</em></Card.Header>
            <Card.Body className='p-1'>
                <Card.Text>
                    <div className='text-center'><Link to={`/messageboard/${messagepost._id}`}><span> {messagepost.content}</span></Link></div>
                    <hr></hr>
                    <small className='m-1'>{messagepost.comments.length} <em>comments</em></small>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
    
    return (
        <>
            <h1 className='m-2 playFont text-center'>Community Message Board</h1>
            <hr></hr>
            <div className='m-2 playFont'>{messageboardCards}</div>
        </>
    )
}

export default MessageBoardIndex