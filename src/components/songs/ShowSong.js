import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSong } from '../../api/songs'
import messages from '../shared/AutoDismissAlert/messages'
import { Card, Container } from 'react-bootstrap'
import YoutubeEmbed from '../shared/YoutubeEmbed'

const ShowSong = (props) => {
    const [song, setSong] = useState(null)

    const { id } = useParams()
    const { msgAlert } = props
    const navigate = useNavigate()

    useEffect(() => {
        getOneSong(id)
            .then(res => setSong(res.data.song))
            .catch(err => {

                msgAlert({
                    heading: 'Error getting song',
                    message: messages.getSongsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [])
    if (!song) {
        return <LoadingScreen />
    }
    // if (song.embedId) {
    //     let embededvideo = song.embedId
    // }
    return (
        <Container className='fluid'>
            <Card>
                <Card.Header>{ song.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Composer: {song.composer}</small></div>
                        <div><small>lyricist: {song.lyricist}</small></div>
                        <div><small>lyrics: {song.lyrics}</small></div>
                        <div><small>type: {song.type}</small></div>
                        <div><a href={song.recordings}>recording</a></div>
                        <div>
                            <h1>Youtube Embed</h1>
                            <YoutubeEmbed embedId={song.embedId} />
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowSong