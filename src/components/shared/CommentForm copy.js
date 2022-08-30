import React, { useState } from "react";
import { Form, Container, Button } from 'react-bootstrap'

const CommentForm =(props) => {
    const {message, comment, handleChange, handleSubmit, heading} = props
    console.log('this is the comment in commentform', message)
    console.log('this is the comment in commentform', comment)
    return (
<>
            <Form onSubmit={handleSubmit} className="m-3">
                {/* <h3>Add a new comment</h3> */}
                    {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} htmlFor="title">Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control className="w-50" placeholder="Title of the message" name="title" value={message.title} id="title" onChange={ handleChange }/>
                    </Col>
                </Form.Group>  */}

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="content">Comment Contents:</Form.Label>
                    <Form.Control className="w-50" as='textarea' placeholder="message contents" name="content" id="content" onChange={ handleChange }/>
                    {/* value={comment.content} */}
                </Form.Group>

                {/* <Form.Group className="mb-3">
                    <Form.Label htmlFor="content">name</Form.Label>
                    <Form.Control className="w-50" placeholder="message contents" value={message.content} name="composer" id="content" onChange={ handleChange }/>
                </Form.Group> */}
                
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </>
    )
}

export default CommentForm