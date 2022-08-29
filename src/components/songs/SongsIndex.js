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
        <Card key={song.id} className='m-2 playFont'>
            <Card.Header className='text-center'>
                <h3><strong><Link to={`/songs/${song._id}`}>{song.title}</Link></strong></h3>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <div>Music by {song.composer ?(<em>{song.composer}</em>) : (<em>Unknown</em>)}</div> 
                    <div>Lyrics by {song.lyricist ?(<em>{song.lyricist}</em>) : (<em>Unknown</em>)}</div>
                    <div>Includes: 
                        {song.lyrics ?(<small> lyrics</small>) : (null)}
                        {song.recordings ?(<small>, recordings</small>) : (null)}
                        {song.embedId ?(<small>, video</small>) : (null)}
                        {song.scorePDF ?(<small>, score</small>) : (null)}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        )
    return (
        <>{songCards}</>
    )
}

export default SongsIndex