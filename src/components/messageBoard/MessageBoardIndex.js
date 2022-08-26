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
        return <p>No Posts yet. Better add some.</p>
    }

    const messageboardCards = messageboard.map(messagepost =>
        <>
        <Card key={messagepost._id} className='m-2'>
        {/* <Card key={message._id} className='m-2'> */}
            <Card.Header>{messagepost.title} by {messagepost.owner.email}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/messageboard/${messagepost._id}`}>View {messagepost.content}</Link>
                </Card.Text>
            </Card.Body>
        </Card>
        {/* <CommentForm /> */}
        </>
        )
    return (
        <>
            <h1 className='m-2'>Community Message Board</h1>
            <div>{messageboardCards}</div>
        </>
    )
}

export default MessageBoardIndex