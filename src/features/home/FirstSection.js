import React from 'react'
import '../../styles/HomeStyle.css'
import '../../styles/StylePages.css'
import { Alert, Card, CardGroup } from 'react-bootstrap'

function FirstSection() {
    let adminName = localStorage.getItem('name') || 'Unkown';

    return (
        <div>
            <Alert className='welcome '>
                Welcome {adminName} to metro dashboard.
            </Alert>
            <CardGroup className='mb-3'>
                <Card className='me-2'>
                    <Card.Body>
                        <Card.Title className='txtLabel'>Stations</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='me-2'>
                    <Card.Body>
                        <Card.Title>Lines</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Subscription</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default FirstSection
