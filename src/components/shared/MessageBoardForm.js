import Button from 'react-bootstrap/Button';
import { Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const MessageBoardForm = (props) => {
    // title: String
    // composer:  String
    // lyricist:String,
    // type: String,
    // lyrics:String,
    // scorePDF:String,
    // recordings:String,
    // embedId: String,
    const { message, handleChange, handleSubmit } = props
console.log('message in form', message)
    return <>
            <Container className='m-2 playFont'>
                <Card>
                <Form  onSubmit={handleSubmit} className="m-3">
                    <h3>Add a new Messageboard Post</h3>
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2} htmlFor="title">Post Title</Form.Label>
                        <Col sm={10}>
                            <Form.Control className="w-50" placeholder="Title of the message" name="title" value={message.title} id="title" onChange={ handleChange }/>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} className="mb-2">
                        <Form.Label  column sm={2} htmlFor="content">Message Contents</Form.Label>
                        <Col sm={10}>
                            <Form.Control className="w-50" as='textarea' rows={4}placeholder="message contents" value={message.content} name="content" id="content" onChange={ handleChange }/>
                        </Col>
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                        <Form.Label htmlFor="content">name</Form.Label>
                        <Form.Control className="w-50" placeholder="message contents" value={message.content} name="composer" id="content" onChange={ handleChange }/>
                    </Form.Group> */}
                    
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
                </Card>
            </Container>
        </>

}

export default MessageBoardForm