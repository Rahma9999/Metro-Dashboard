import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ViewStation from '../features/stations/ViewStation'
import EditStation from '../features/stations/EditStation'
import NotFound from '../features/NotFound'
import CreateStation from '../features/stations/CreateStation'
import UserDetails from '../features/subscription/UserDetails'
import EditTicket from '../features/ticket/EditTicket'
import CreateTicket from '../features/ticket/CreateTicket'
import CreateType from '../features/Types/CreateType'
import Edittype from '../features/Types/EditType'
import RejectMailModal from '../features/requests/RejectMailModal'

function DBModal(props) {
    const theme = localStorage.getItem('app-theme') || 'light';
    const mode = () => {
        switch(props.mode){
            // Station 
            case 'viewStation': 
            return <ViewStation id={props.id} />;
            case 'editStation':
                return <EditStation id={props.id} onHide={props.onHide} />;
            case 'createStation': 
            return <CreateStation onHide={props.onHide} />

            //Ticket
            case 'editTicket': 
                return <EditTicket id={props.id} onHide={props.onHide} />
            case 'createTicket':
                return <CreateTicket onHide={props.onHide}/>

            // Subscription
            case 'viewSub':
                return <UserDetails />;
            case 'rejectMail':
                            return (
                                <RejectMailModal
                                    id={props.id}
                                    requestData={props.requestData}
                                    onHide={props.onHide}
                                />
                            );

            // Subscription Types
            case 'createType':
                return <CreateType onHide={props.onHide}/>
            case 'editType':
                return <Edittype id={props.id} onHide={props.onHide} />;
            default: 
            return <NotFound />; 
        }
    }
    return (
        <Modal
        show ={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme={theme}
    >
        <Modal.Body>
            {mode ()}
        </Modal.Body>
        <Modal.Footer>
            <Button className='btn' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
    }

export default DBModal
