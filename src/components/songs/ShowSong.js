import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSong, updateSong, removeSong, addSongToUser } from '../../api/songs'
import messages from '../shared/AutoDismissAlert/messages'
import { Button, Card, Container } from 'react-bootstrap'
import YoutubeEmbed from '../shared/YoutubeEmbed'
import EditSongModal from './EditSongModal'

import { Document, Page } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = "cdnjs.cloudflare.com/ajax/libs/pdf.js/^5.7.2/pdf.worker.js";
// pdfjs.GlobalWorkerOptions.workerSrc = cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js;

import scoreExample from '../../scores/pexels.jpg'
import ReactAudioPlayer from 'react-audio-player'
// import songs from '../../audio/jobim.mp3'
import jobim from '../../audio/jobim.mp3'
import chopin from '../../audio/chopinwaltz.mp3'

const tuneMap = {jobim, chopin}

const ShowSong = (props) => {
    const [song, setSong] = useState({})
    const [editModalShow, setEditModalShow] = useState(false)
    const [audio, setAudio] = useState(null)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { msgAlert, user } = props
    console.log('user in showSong', user)
    console.log('song in showSong', song)
    const navigate = useNavigate()

    // useEffect(function() {
    //     async function getSong(){
    //        const oneSong = await getOneSong(id)
    //             setSong(oneSong)
    //             console.log("song", song)
    //         }
// }, [updated])

    useEffect(() => {
        getOneSong(id)
            .then(res => {
                console.log('res data', res.data.song)
                setSong(res.data.song)
                setAudio()
                console.log('song', song)
            })
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
    console.log('song', song.recordings)
    return (
        <>
        <Container className='m-2 fluid playFont'>
            <Card>
                <Card.Header className='text-center'><h2>{ song.title}</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {song.composer ?(<div><strong>composer:</strong> {song.composer}</div>) : (null)}
                        {song.lyricist ?(<div><strong>lyricist:</strong> {song.lyricist}</div>) : (null)}
                        {song.scorePDF ?(<div><strong>scorePDF:</strong> {song.scorePDF}</div>) : (null)}

                        {song.type ?(<div><strong>type:</strong> {song.type}</div>) : (null)}
                        {/* {song.recordings ?(<div><strong>recordings:</strong> {song.recordings}</div>) : (null)} */}
                    <Card className='m-2'>
                        <Card.Header><strong>Recording</strong></Card.Header>
                      <Card.Body className='text-center'>
                            <ReactAudioPlayer 
                                src={
                                    tuneMap[song.recordings]
                                }
                                controls
                        />
                    </Card.Body>
                    </Card>
                    <hr></hr>
                        {song.lyrics ?(<div><strong>Lyrics:</strong> {
                            song.lyrics.split("|").map(line => (
                                <div className='text-center'>{line}</div>)
                            ) 
                        }
                        </div>) : (null)}
                        <hr></hr>
                        {song.embedId ?(<div className='m-2'>
                            <YoutubeEmbed embedId={song.embedId} />
                        </div>) : (null)}
                    </Card.Text>
                </Card.Body>

                <img href='../../scores/pexels.jpg' />

                <Card.Footer className='text-center'>
                    {
                        song.owner && user && song.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                            Edit Song
                            </Button>
                            <Button onClick={() => removeTheSong()} className="m-2" variant="danger">
                                Delete The Song
                            </Button>
                        </>
                    :
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