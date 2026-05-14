import React, { useEffect, useState } from 'react'
import { StationController } from '../../controllers/StationController';
import { Alert, Spinner, Table } from 'react-bootstrap';
import { AppLoader } from '../../component/AppLoader';

function ViewStation({id}) {
    const {getOneStation} = StationController();
    const theme = localStorage.getItem('app-theme') || 'light';

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [station, setStation] = useState([]);

    const viewStation = async () => {
        setLoading(true);
        setError('');
        try{
            const data = await getOneStation(id);
            setStation(data);
        }catch(err){
            setError(err.message || 'Failed to load station');
        }finally {
            setLoading(false);
        }
    } 
    useEffect(() => {
        if(id)
            viewStation();
        }, [id]);

        if(loading) return (
            <AppLoader />
        );

    return (
        <div className='container my-4 w-100'>
            <h2 className='txtTitle'>{station.name} station.</h2>
        
            {error && <Alert variant="danger">{error}</Alert>}

            <Table className='my-3' variant={theme}>
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
            <div>
                <h4 className='txtTitle'>Another Details</h4>
                <Table className='my-3 w-100' variant={theme}>
                    <tbody>
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
            </div>
            }
        </div>
    )
}

export default ViewStation
