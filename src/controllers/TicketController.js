import axiosInstance from '../services/axiosInstance';

export const TicketController = () => {

    const getTickets = async () => {
        try{
            const res = await axiosInstance.get('/getalltickets');
            return res.data.data || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to get all stickets"
        );
        }
    };

    const createTicket = async (data) => {
        try{
            await axiosInstance.post('/addticket', data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to create new ticket"
        );
        }
    }

    const deleteTicket = async (id) => {
        try{
            await axiosInstance.delete(`/deleteticket/${id}`)
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to delete the ticket"
        );
        }
    };

    const getTicket = async (id) => {
        try {
            const res = await axiosInstance.get(`/getticket/${id}`);
            return res.data.data;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to get the ticket"
        );
        }
    }

    const updateTicket = async (id, data) => {
        try {
            await axiosInstance.patch(`/updateticket/${id}`, data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to update the ticket"
        );
        }
    }

    return {
        getTickets,
        deleteTicket,
        createTicket,
        getTicket,
        updateTicket,
    }
}

