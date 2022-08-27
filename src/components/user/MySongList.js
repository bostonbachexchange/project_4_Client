import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import LoadingScreen from '../shared/LoadingScreen'
import YoutubeEmbed from "../shared/YoutubeEmbed";
// import { getMYSongs } from '../../api/USER'
import messages from '../shared/AutoDismissAlert/messages'

const MySongList = (props) => {
    const { user } = props
    console.log('user in MySongList', user?.myList)
    let repList = user?.myList


 return (
    <>
        <h1 className="m-2 playFont">My Song List</h1>

        {!user ?(
            <p><LoadingScreen/></p> 
        ) : ( 
           repList.map(rep => 
        
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
           </>
            )
        )}
    </>)
}

export default MySongList