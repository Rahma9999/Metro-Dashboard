import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './Station.css';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { StationController } from './StationController.js';

function StationPage() {
    const navigate = useNavigate();
    const {fetchStations, removeStation, searchStation, getOneStation} = StationController();
    
    const [stations, setStations] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [page, setPage] = useState(1);
    
    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [error, setError] = useState('');

    const getData = async () => {
        setLoading(true);
        setError('');
        try{
            const data = await fetchStations(page);
            setStations(data);
        }catch(err){
            setError(err.message || 'Failed to load stations');
        }finally {
            setLoading(false);
        }
    } 
    useEffect(() => {
        getData();
    },[page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this station?")) return;
        setLoading(true);
        try {
            const res = await getOneStation(id);
            ///////////// problem: each station has different id and transID occure from create////////////////
            // if(res.is_transfer){
            //     console.log('trans id: ' + res.transfer_to[0]._id);
            //     if (!window.confirm("Do you want to delete the transfer station that belongs to it also?"))
            //         await removeStation(res.transfer_to[0]._id);
            // }
            await removeStation(id);
            getData(); 
        } catch (err) {
        setError(err.message || "Failed to delete station");
        } finally {
        setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoadingSearch(true);
        setError('');
        try{
            const res = await searchStation(searchKey);
            setStations(res || []);
            console.log(res);
        }catch(err){
            setError(err.message);
        }finally {
            setLoadingSearch(false);
        }
    };

    if(loading) return (
    <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" variant="dark" />
    </div>
    );
    
    return (
        <div className='stationMain container my-4 w-100'>
            <h2 className='txtTitle'>Station Records</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            
            <div className='d-flex justify-content-between'>
                <div>
                    <Link to='/station/create' className='btn btn-primary me-1'>
                        Add new Station
                    </Link>
                    <Button className='btn' onClick={getData}>Refresh</Button>
                </div>
                <span className='align-middle'>
                    <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='ex: helwan' className='rounded-3 p-1 mx-2' />
                    <Button className='btn' disabled={loadingSearch} onClick={handleSearch}>
                        {loadingSearch ? <Spinner size="sm" animation="border" /> : "Search"}
                    </Button>
                </span>
            </div>
            <div className="container-fluid mt-4">
                <Table bordered className='stationTable mw-100 '>
                <thead>
                    <tr>
                    <th>Postion</th>
                    <th>Name</th>
                    <th>Line Number</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station) => (
                        <tr key={station._id}>
                            <td>{station.position}</td>
                            <td>{station.name}</td>
                            <td>{station.line_number}</td>
                            <td>
                                <Button className='btn me-1' onClick={() => navigate(`/station/view/${station._id}`)}>
                                    View
                                </Button>
                                <Button className='btn me-1' onClick={() => navigate(`/station/edit/${station._id}`)}>
                                    Edit
                                </Button>
                                <Button className='btn me-1' onClick={() => handleDelete(station._id)}>
                                    Delete
                                </Button>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                <Button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="me-2"
                >
                    Previous
                </Button>

                <span className="align-self-center">Page {page}</span>

                <Button 
                    disabled={page === 10}
                    onClick={() => setPage(page + 1)}
                    className="ms-2"
                >
                    Next
                </Button>
            </div>
            </div>
        </div>
    )
}

export default StationPage
