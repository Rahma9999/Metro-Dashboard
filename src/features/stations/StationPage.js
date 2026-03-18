import Button from 'react-bootstrap/Button';
import React, { useEffect, useReducer, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Card, CardGroup, Col, Container, Row, Spinner } from 'react-bootstrap';
import { StationController } from './StationController.js';

const initState = {loading: false, loadingSearch: false, error: '', pageLength: 2, result: 1, page: 1};
const reducer = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case 'loading':
            return { ...state, loading: true, error: ''};
            case 'unloading':
                return { ...state, loading: false };
        case 'setLoadingSearch':
            return {...state, loadingSearch: true, error: ''};
        case 'setUnloadingSearch':
            return {...state, loadingSearch: false};
        case 'setError':
            return {...state, error: action.payload};
        case 'setPagesData':
            return {...state, pageLength: action.pageLength, result: action.res}
        case 'incPage':
                return {...state, page: state.page + 1};
        case 'decPage':
            return {...state, page: state.page - 1};
        default:
            throw new Error("station page: reducer Error!!");
    }
};

function StationPage() {
    const navigate = useNavigate();
    const {fetchStations, removeStation, searchStation} = StationController();
    
    const [stations, setStations] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    // const [page, setPage] = useState(1);
    
    const [{loading, error, loadingSearch, result, page}, dispatch] = useReducer(reducer, initState);
    // const totalPages = Math.ceil(pageLength / result);

    const theme = localStorage.getItem('app-theme') || 'light';

    const getData = async () => {
        dispatch({type:'loading'});
        setSearchKey('');
        try{
            const data = await fetchStations(page);
            dispatch({type: 'setPagesData', pageLength: data.stationsTotalLength, res: data.results});
            setStations(data.data.allStations);
        }catch(err){
            dispatch({type: 'setError', payload: ('Failed to load stations')});
        }finally {
            dispatch({type:'unloading'});
        }
    } 
    useEffect(() => {
        getData();
    },[page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this station?")) return;
        dispatch({type:'loading'});
        try {
            await removeStation(id);
            getData(); 
        } catch (err) {
            dispatch({type: 'setError', payload: ( "Failed to delete station")});
        } finally {
        dispatch({type:'unloading'});
        }
    };

    const handleSearch = async () => {
        dispatch({type: 'setLoadingSearch'});
        try{
            const res = await searchStation(searchKey);
            setStations(res || []);
            // console.log(res);
        }catch(err){
            console.log(err)
            dispatch({type: 'setError', payload: "Station Not Found"});
            setStations([]);
        }finally {
            dispatch({type: 'setUnloadingSearch'});
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
                            <div className='text-primary'>Line 1</div>
                            <div className='stat-value'>35 stations</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                            <div className='text-danger'>Line 2</div>
                            <div className='stat-value'>20 stations</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                            <div className='text-success'>Line 3</div>
                            <div className='stat-value'>34 stations</div>
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
                    onClick={() => dispatch({type: 'decPage'})}
                    className="me-2"
                >
                    Previous
                </Button>

                <span className="txtTitle align-self-center">Page {page}</span>
                
                <Button 
                    disabled={page >= result}
                    onClick={() => {
                        dispatch({type: 'incPage'})
                        console.log(page,result);
                    }}
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
