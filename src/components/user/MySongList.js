import React from "react";
import { Card } from "react-bootstrap";

const MySongList = (props) => {
    const { user } = props
    console.log('user in MySongList', user)


    // const songCards = songs.map(song => 
    //  <>
    //     <Card key={song.id} className='m-2'>
    //         <Card.Header>{song.title}</Card.Header>
    //         <Card.Body>
    //             <Card.Text>
    //                 <Link to={`/songs/${song._id}`}>View {song.title}</Link>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // </>
    //    )
    return (
        <>
        <p>my list right herrrza</p>
        {/* {songCards} */}
        </>
    )
        
}

export default MySongList