import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllSongs } from '../../api/songs'
import messages from '../shared/AutoDismissAlert/messages'
const SongsIndex = (props) => {
    const [songs, setSongs] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props
    useEffect(() => {
        getAllSongs()
            .then(res => setSongs(res.data.songs))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Songs',
                    message: messages.getSongsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])
    if (error) {
        return <p>Error!</p>
    }
    if (!songs) {
        return <LoadingScreen />
    } else if (songs.length === 0) {
        return <p>No songs yet. Better add some.</p>
    }

    const songCards = songs.map(song => 
        <Card key={song.id} className='m-2'>
            <Card.Header>{song.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/songs/${song._id}`}>View {song.title}</Link>
                </Card.Text>
            </Card.Body>
        </Card>
        )
    return (
        <>{songCards}</>
    )
}

export default SongsIndex