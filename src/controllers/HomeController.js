import React from 'react'
import axiosInstance from '../services/axiosInstance';

export const HomeController = () => {
    
    const allLocation = async () => {
        try{
            const res = await axiosInstance.get('/alllocations');
            if(!res)
                throw new Error('No location data!!');
            // console.log('all location data: ', res?.data);
            return res?.data;
        }catch(err){
            throw err;
        }
    }

    return{
        allLocation,
    }
}
