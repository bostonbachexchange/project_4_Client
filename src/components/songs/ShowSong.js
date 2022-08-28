import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSong, updateSong, removeSong, addSongToUser } from '../../api/songs'
import messages from '../shared/AutoDismissAlert/messages'
import { Button, Card, Container } from 'react-bootstrap'
import YoutubeEmbed from '../shared/YoutubeEmbed'
import EditSongModal from './EditSongModal'

const ShowSong = (props) => {
    const [song, setSong] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { msgAlert, user } = props
    console.log('user in showSong', user)
    console.log('song in showSong', song)
    const navigate = useNavigate()
    const testLyrics = "Lorem ipsum, Lorem ipsum Lorem % ipsum Lorem ipsum Lorem ipsum % % Lorem ipsum % Lorem ipsum Lorem ipsum Lorem ipsum%Lorem ipsum%Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum % % % % %Lorem ipsum"

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
    }, [updated])


    if (!song) {
        return <LoadingScreen />
    }

    const removeTheSong = () => {
        removeSong(user, song._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeSongSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/songs')})
            .catch(err => {
                msgAlert({
                    heading: 'Error removing song',
                    message: messages.removeSongFailure,
                    variant: 'danger'
                })
            })
    }
    const addTheSong = () => {
        addSongToUser(user, song._id)
            // .then(res => {navigate('/mysongs')})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'added song to user prof',
                    variant: 'success'
                })
            })
            .then(() =>  setUpdated(!updated))
            .catch(err => {
                msgAlert({
                    heading: 'Error adding song',
                    message: 'failed to add song to user',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
        <Container className='m-2 fluid playFont'>
            <Card>
                <Card.Header><h2>{ song.title}</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {song.composer ?(<div><strong>composer:</strong> {song.composer}</div>) : (null)}
                        {song.lyricist ?(<div><strong>lyricist:</strong> {song.lyricist}</div>) : (null)}
                        {song.scorePDF ?(<div><strong>scorePDF:</strong> {song.scorePDF}</div>) : (null)}

                        {song.type ?(<div><strong>type:</strong> {song.type}</div>) : (null)}
                        {song.recordings ?(<div><strong>recordings:</strong> {song.recordings}</div>) : (null)}

                        {/* loop lyrics */}
                        {song.lyrics ?(<div><strong>Lyrics:</strong> {

                       song.lyrics.split("|").map(line => (
                            <div>{line}</div>
                        ) )
                            
                        }
                        </div>) : (null)}
                        {/* {testLyrics ?(<div><strong>Lyrics:</strong> {

                       testLyrics.split("%").map(line => (
                            <div>{line}</div>
                        ) )
                            
                        }
                        </div>) : (null)} */}

                        {song.embedId ?(<div className='m-2'>
                            <YoutubeEmbed embedId={song.embedId} />
                        </div>) : (null)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {/* // this will show user the edit button if they 'own' the song, We want to make it so you can edit the song if you are an administrator */}
                    {
                        // song.owner && user && song.owner === user._id 
                        song.owner && user && song.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                            Edit Song
                            </Button>
                            <Button onClick={() => removeTheSong()} className="m-2" variant="danger">
                                Delete The Song
                            </Button>

                            {/* ADD A BUTTON TO ADD SONG TO PRACTICE LIST */}
                        </>
                    :
                    // in theory......
                    <p>Only an Admin can edit this song</p>
                    }
                    <Button onClick={() => addTheSong()} className="m-2" variant="info">
                    Add to my repertoire list
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
        <EditSongModal 
            user={user}
            song={song}
            show={editModalShow}
            updateSong={updateSong}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(!updated)}
            handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowSong