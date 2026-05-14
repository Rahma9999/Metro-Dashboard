import axiosInstance from '../services/axiosInstance';

export const TypeController = () => {

    const getAllSubTypes = async (page) => {
        try{
            const res = await axiosInstance.get(`/subscriptions/allsubscriptionstypes?page=${page}`);
            return res || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    };

    const createSubType = async (data) => {
        try{
            await axiosInstance.post('/subscriptions/createnewsubscriptionstype', data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }

    const deleteSubType = async (id) => {
        try{
            await axiosInstance.delete(`/subscriptions/deletesubscriptionstype/${id}`)
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    };


    const updateSubType = async (id, data) => {
        try {
            await axiosInstance.patch(`/subscriptions/updatesubscriptionstype/${id}`, data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    }

    const getSubType = async (id) => {
        try {
            const res = await axiosInstance.get(`/subscriptions/subscriptiontype/${id}`);
            return res.data.data?.subscriptionType;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }

    return {
        getAllSubTypes,
        deleteSubType,
        createSubType,
        updateSubType,
        getSubType,
    }
}

