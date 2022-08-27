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
        <h1>My Song List</h1>
        {!user ?(
            <p>no user true</p> 
         ) : ( 
           repList.map(rep => 
        
            <>
            <Container>
              <Card key={rep._id} className='m-2'>
                  <Card.Header><h1><Link to={`/songs/${rep._id}`}>{rep.title}</Link></h1></Card.Header>
                  <Card.Body>
                      <Card.Text>
                          
                          <div><small>Composer: {rep.composer}</small></div>
                        <div><small>lyricist: {rep.lyricist}</small></div>
                        <div><small>lyrics: {rep.lyrics}</small></div>
                        <div><small>type: {rep.type}</small></div>
                        <div><a href={rep.recordings}>recording</a></div>
                        <div>
                        {rep.embedId ?(
                            <><h1>Youtube Embed</h1>
                            <YoutubeEmbed embedId={rep.embedId} /></> 
                        ) : (<p>embedId does not exist</p> )}
                        </div>
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