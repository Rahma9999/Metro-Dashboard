import React, { useEffect, useState } from 'react'
import { StationController } from './StationController';
import { Alert, Spinner, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

function ViewStation() {
    const {getOneStation} = StationController();
    const theme = localStorage.getItem('app-theme') || 'light';
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [station, setStation] = useState([]);

    const viewStation = async () => {
        setLoading(true);
        setError('');
        try{
            const data = await getOneStation(id);
            setStation(data);
            console.log(data);
        }catch(err){
            setError(err.message || 'Failed to load station');
        }finally {
            setLoading(false);
        }
    } 
    useEffect(() => {
            viewStation();
        },[]);

        if(loading) return (
    <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" variant={(theme === 'dark')? 'light' : 'dark'} />
    </div>
    );

    return (
        <div className='container my-4 w-100'>
            <h2 className='txtTitle'>{station.name} station.</h2>
        
            {error && <Alert variant="danger">{error}</Alert>}
            
            {/* <Link to='/station' className='btn btn-primary my-1'>
                <IoArrowBackCircle />
                back
            </Link> */}

            <Table className='my-3'>
                <tbody>
                    <tr>
                    <td>ID: </td>
                    <td>{station._id}</td>
                    </tr>
                    <tr>
                    <td>Position: </td>
                    <td>{station.position}</td>
                    </tr>
                    <tr>
                    <td>Line: </td>
                    <td>{station.line_number}</td>
                    </tr>
                    <tr>
                    <td>Is Transfer: </td>
                    <td>{station.is_transfer? 'Yes' : 'No'}</td>
                    </tr>
                    </tbody>
            </Table>

            {station.is_transfer &&
            <>
                <h4 className='txtTitle'>Another Details</h4>
                <Table className='my-3'>
                    <tbody>
                        <tr>
                        <td>Transfer ID: </td>
                        <td>{station.transfer_to[0]._id}</td>
                        </tr>
                        <tr>
                        <td>Transfer line: </td>
                        <td>{station.transfer_to[0].line}</td>
                        </tr>
                        <tr>
                        <td>Transfer position: </td>
                        <td>{station.transfer_to[0].position}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
            }
        </div>
    )
}

export default ViewStation
