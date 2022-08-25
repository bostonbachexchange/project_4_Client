import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import LoadingScreen from '../shared/LoadingScreen'
// import { getMYSongs } from '../../api/USER'
import messages from '../shared/AutoDismissAlert/messages'

const MySongList = (props) => {
    const { user } = props
    console.log('user in MySongList', user?.myList)
    let repList = user?.myList


 return (
    
    <>
        <p>hello world</p>
        {!user ?(
            <p>no user true</p> 
         ) : ( 
           repList.map(rep => 
        
            <>
              <Card key={rep} className='m-2'>
                  <Card.Header>Title</Card.Header>
                  <Card.Body>
                      <Card.Text>
                          <Link to={`/songs/${rep}`}>View {rep}</Link>
                      </Card.Text>
                  </Card.Body>
              </Card>
           </>
              )
        )}
    </>)
}

export default MySongList