import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { StationController } from '../../controllers/StationController.js';
import DBModal from '../../component/DBModal.js';
import { usePagination } from '../../services/usePagination.js';
import { FaSync } from 'react-icons/fa';
import { AppLoader } from '../../component/AppLoader.js';

function StationPage() {
    const {fetchStations, removeStation, searchStation} = StationController();
    const [stations, setStations] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [selectedStationId, setSelectedStationId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');
    
const { state: { loading, error, loadingSearch, result, page }, dispatch } = usePagination();
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
    }, []);

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
        }catch(err){
            dispatch({type: 'setError', payload: "Station Not Found"});
            setStations([]);
        }finally {
            dispatch({type: 'setUnloadingSearch'});
        }
    };

    if(loading) return (
    <AppLoader />
    );
    
    return (
        <div className='stationMain container my-4 w-100'>
            {error && <Alert variant="danger">{error}</Alert>}

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
                id={selectedStationId}
            />

            <Container className='my-4 w-100'>
                
            </Container>
            
            <Container className=''>
                <h2 className='txtTitle mb-3'>Stations Management</h2>
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
                        <Button className='btn mx-2' variant="outline-secondary" onClick={getData} disabled={loading}>
                            <FaSync className={loading ? 'spin' : ''} />
                        </Button>
                        <Button className='btn  me-1' onClick={() => {
                                setMode('createStation');
                                setModalShow(true);}
                                }>
                            Add new station
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-3'>
                <Table bordered variant={theme} className='stationTable'>
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
                                    <Button className='btn me-1'
                                    onClick={() => {
                                        setSelectedStationId(station._id);
                                        setMode('viewStation');
                                        setModalShow(true);}
                                        }>
                                        View
                                    </Button>
                                    <Button className='btn me-1' onClick={() => {
                                        setSelectedStationId(station._id);
                                        setMode('editStation');
                                        setModalShow(true);}
                                        }>
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
