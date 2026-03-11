import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Card, CardGroup, Col, Container, Row, Spinner } from 'react-bootstrap';
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
    const theme = localStorage.getItem('app-theme') || 'light';

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
        <Spinner animation="border" variant={(theme === 'dark')? 'light' : 'dark'} />
    </div>
    );
    
    return (
        <div className='stationMain container my-4 w-100'>
            {error && <Alert variant="danger">{error}</Alert>}

            <Container className='my-4 w-100'>
                <h2 className='txtTitle mb-3'>Stations Management</h2>
                <CardGroup className='statCard'>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                            <div>Line 1</div>
                            <div className='stat-value'>14 stations</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                            <div>Line 2</div>
                            <div className='stat-value'>14 stations</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                            <div>Line 3</div>
                            <div className='stat-value'>14 stations</div>
                        </div>
                    </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
            
            <Container className=''>
                <Row>
                    <Col className='align-middle'>
                        <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='ex: helwan' className='rounded-3 p-2 mx-2 w-100' />
                    </Col>
                    <Col>
                        <Button className='btn' disabled={loadingSearch} onClick={handleSearch}>
                            {loadingSearch ? <Spinner size="sm" animation="border" /> : "Search"}
                        </Button>
                    </Col>
                    <Col>
                        <Link to='/station/create' className='btn btn-primary me-1'>
                            Add new one
                        </Link>
                        <Button className='btn' onClick={getData}>Refresh</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-3'>
                <Table bordered className='stationTable'>
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
                                <div className="d-flex flex-wrap gap-1">
                                    <Button className='btn me-1' onClick={() => navigate(`/station/view/${station._id}`)}>
                                        View
                                    </Button>
                                    <Button className='btn me-1' onClick={() => navigate(`/station/edit/${station._id}`)}>
                                        Edit
                                    </Button>
                                    <Button className='btn me-1' onClick={() => handleDelete(station._id)}>
                                        Delete
                                    </Button>  
                                </div>                          
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-2">
                <Button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="me-2"
                >
                    Previous
                </Button>

                <span className="txtTitle align-self-center">Page {page}</span>

                <Button 
                    disabled={page === 10}
                    onClick={() => setPage(page + 1)}
                    className="ms-2"
                >
                    Next
                </Button>
            </div>
            </Container>
        </div>
    )
}

export default StationPage
