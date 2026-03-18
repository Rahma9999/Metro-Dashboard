import React from 'react'
import axiosInstance from "../../services/axiosInstance";

export const StationController =() => {
    
    const fetchStations = async (page = 1) => {
        try{
            const res = await axiosInstance.get(`/getallstations?page=${page}`);
            return res.data || [];
        }catch(err){
            throw err;
        }
    };

    const getOneStation = async (id) => {
        try{
            const res = await axiosInstance.get(`getstation/${id}`);
            const station = res.data?.data?.station;
            if(!station) throw new Error('Station not found');
            return station;
        }catch(err){
            throw err;
        }
    }

    const removeStation = async (id) =>{
        try{
            await axiosInstance.delete(`/deletestation/${id}`);
        }catch(err){
            throw err;
        }
    };

    const createStation = async (data) => {
        try{
            await axiosInstance.post('/addstation', data);
        }catch(err){
            throw err;
        }
    };

    const editStation = async (id, data) => {
        try{
            await axiosInstance.patch(`/updatestation/${id}`, data);
        }catch(err){
            throw err;
        }
    };

    const searchStation = async (key) => {
        if (!key.trim()) {
            throw new Error("Enter the value for the search");
        }
        try{
            const res = await axiosInstance.get(`/search/${key}`);
            return res.data?.data?.station;
        }catch(err){
            throw err;
        }
    };

    return {
        fetchStations,
        getOneStation,
        removeStation,
        createStation,
        editStation,
        searchStation,
    };
}

