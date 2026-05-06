import React from 'react'
import axiosInstance from "../services/axiosInstance";

export const StationController =() => {
    
    const fetchStations = async (page = 1) => {
        try{
            const res = await axiosInstance.get(`/getallstations?page=${page}`);
            return res.data || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    };

    const getOneStation = async (id) => {
        try{
            const res = await axiosInstance.get(`getstation/${id}`);
            const station = res.data?.data?.station;
            if(!station) throw new Error('Station not found');
            return station;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    }

    const removeStation = async (id) =>{
        try{
            await axiosInstance.delete(`/deletestation/${id}`);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    };

    const createStation = async (data) => {
        try{
            await axiosInstance.post('/addstation', data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    };

    const editStation = async (id, data) => {
        try{
            await axiosInstance.patch(`/updatestation/${id}`, data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
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
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        };
    };

    const stationsCount = async () => {
        try{
            const res = await axiosInstance.get('/lines/stations-count');
            if(!res) throw new Error('Not found stations count!');
            return res?.data?.data?.result;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }

    return {
        fetchStations,
        getOneStation,
        removeStation,
        createStation,
        editStation,
        searchStation,
        stationsCount,
    };
}

