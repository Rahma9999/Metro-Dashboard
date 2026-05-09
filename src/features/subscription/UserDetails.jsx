import React, { useState } from 'react'
import '../../styles/StylePages.css'
import { Alert, Container, Table } from 'react-bootstrap'

function UserDetails({id}) {
    const [error] = useState('');

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Container>
            <div className="d-flex align-items-center gap-2 mt-3">
                    <img src='../../assets/images/metroBg2.jpeg' alt='' className='w-20' />
                    <h4 className="member-name">Rahma Nasser</h4>
                </div>

            <Table className='my-3'>
                <tbody>
                    <tr>
                        <td>ID: </td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>SSN: </td>
                        <td>45456464564</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>test@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Type: </td>
                        <td>Student</td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Amount:</td>
                        <td>120&</td>
                    </tr>
                    <tr>
                        <td>Start Station:</td>
                        <td>ghamra</td>
                    </tr>
                    <tr>
                        <td>End Station:</td>
                        <td>haron</td>
                    </tr>
                    <tr>
                        <td>Start date:</td>
                        <td>10/2/2026</td>
                    </tr>
                    <tr>
                        <td>End date:</td>
                        <td>10/5/2026</td>
                    </tr>
                    <tr>
                        <td>Created at:</td>
                        <td>10/5/2026</td>
                    </tr>
                    <tr>
                        <td>Udated at:</td>
                        <td>10/5/2026</td>
                    </tr>
                    </tbody>
            </Table>
            </Container>
        </div>
    )
}

export default UserDetails
