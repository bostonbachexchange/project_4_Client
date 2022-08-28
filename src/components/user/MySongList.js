import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoadingScreen from '../shared/LoadingScreen'
import YoutubeEmbed from "../shared/YoutubeEmbed";
import { deleteSongfromUser } from "../../api/songs";
import messages from '../shared/AutoDismissAlert/messages'

const MySongList = (props) => {
    const { user, msgAlert } = props
    const [updated, setUpdated] = useState(false)
    const [userList, setUserList] = useState([])
    const [userSet, setUserSet] = useState(false)

    let repList = user?.myList
    // console.log('repList', repList)
    // console.log('user in MySongList', user?.myList)

    const setTheUser = () => {
        // console.log('here is the repList to push into user', repList)
        setUserList(repList)
        setUserSet(true)
        console.log('here is the userList', userList)
    }

    useEffect(() => {
        if(!userSet) {
            setTheUser()
            setUserList(repList)
            console.log('useEffect ran')
        }
    }, [repList])

    const removeTheSong = (rep) => {
        console.log('here is the rep', rep)
        deleteSongfromUser(user, rep.rep._id)
            .then((item) => {
                const cloneArray = JSON.parse(JSON.stringify(userList));
                console.log('cloneArray', cloneArray)
                const filterCloneArray =  cloneArray.filter((item) => {
                    return item._id !== rep.rep._id
                })

                console.log('filterCloneArray', filterCloneArray)
                console.log('userList123123', userList)
                console.log('item', item)
                setUserList(filterCloneArray)

                msgAlert({
                    heading: 'Success',
                    message: messages.removeSongSuccess,
                    variant: 'success'
                })
        })
        .then(() => setUpdated(!updated))
        .catch(err => {
            msgAlert({
                heading: 'Error removing song',
                message: messages.removeSongFailure,
                variant: 'danger'
            })
        })
    }

 return (
    <>
        <h1 className="m-2 playFont">My Song List</h1>

        {!user ?(
            <p><LoadingScreen/></p> 
        ) : ( 
            userList.map(rep => 
                //    repList.map(rep => 
            <>
            
                <Container>
                    <Card key={rep._id} className='m-2 playFont'>
                        <Card.Header><h1><Link to={`/songs/${rep._id}`}>{rep.title}</Link></h1></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {rep.composer ?(<div><strong>composer:</strong> {rep.composer}</div>) : (null)}
                                {rep.lyricist ?(<div><strong>lyricist:</strong> {rep.lyricist}</div>) : (null)}
                                {rep.scorePDF ?(<div><strong>scorePDF:</strong> {rep.scorePDF}</div>) : (null)}
                                {rep.type ?(<div><strong>type:</strong> {rep.type}</div>) : (null)}
                                {rep.recordings ?(<div><strong>recordings:</strong> {rep.recordings}</div>) : (null)}
                                {rep.embedId ?(<div className='m-2'>
                                    <YoutubeEmbed embedId={rep.embedId} />
                                </div>) : (null)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
                <Button onClick={() => removeTheSong({rep})} className="m-2" variant="danger">
                    Remove my repertoire list
                </Button>
           </>
            )
        )}
    </>)
}

export default MySongList