import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSong } from '../../api/songs'
import messages from '../shared/AutoDismissAlert/messages'

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
    return <p>showing song { id }</p>
}

export default ShowSong