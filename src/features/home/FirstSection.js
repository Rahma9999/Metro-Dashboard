import React from 'react'
import '../../styles/HomeStyle.css'
import { Alert, Card, CardGroup, ProgressBar } from 'react-bootstrap'
import impMap from '../../assets/images/metroMap.jpg'

function FirstSection() {
    let adminName = localStorage.getItem('name') || 'Unkown';

    return (
        <div>
            <Alert className='welcome'>
                Welcome {adminName} to metro dashboard.
            </Alert>
            <CardGroup className='my-3'>
                <Card className='me-2'>
                    <Card.Body>
                        <Card.Title>Stations</Card.Title>
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
            <div className='my-3'>
                <h2>Statistical crowding</h2>
                    <div className='mt-2'>Line 1: </div>
                    <ProgressBar variant="success" now={70} />
                    <div className='mt-2'>Line 2: </div>
                    <ProgressBar variant="info" now={40} />
                    <div className='mt-2'>Line 3: </div>
                    <ProgressBar variant="danger" now={70} />
            </div>
            <div className='d-flex justify-content-center'>
                <img src={impMap} alt='' />
            </div>
        </div>
    )
}

export default FirstSection
