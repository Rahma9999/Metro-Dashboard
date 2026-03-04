import React from 'react'
import axiosInstance from '../../services/axiosInstance';

export const TicketController = () => {

    const getTickets = async () => {
        try{
            const res = await axiosInstance.get('/getalltickets');
            return res.data.data || [];
        }catch(err){
            throw err;
        }
    };

    const createTicket = async (data) => {
        try{
            await axiosInstance.post('/addticket', data);
        }catch(err){
            throw err;
        }
    }

    const deleteTicket = async (id) => {
        try{
            await axiosInstance.delete(`/deleteticket/${id}`)
        }catch(err){
            throw err;
        }
    };

    const getTicket = async (id) => {
        try {
            const res = await axiosInstance.get(`/getticket/${id}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    const updateTicket = async (id, data) => {
        try {
            await axiosInstance.patch(`/getticket/${id}`, data);
        }catch(err){
            throw err;
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

