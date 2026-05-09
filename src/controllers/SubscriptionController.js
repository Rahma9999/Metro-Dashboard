import axiosInstance from "../services/axiosInstance";

export const SubscriptionController = () => {
    const getAllSubscriptions = async (page = 1) => {
        try{
            const res = await axiosInstance.get(`/subscriptions?page=${page}`);
            return res.data || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message
        );
        }
    }

    const changeStatus = async (id, status) => {
        try{
            const res = await axiosInstance.patch(`/subscriptions/${id}/status`, status);
            return res.data?.data || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to change status"
        );
        }
    }

    const getDocumentUrl = (subId, docType) => {
        return `${axiosInstance.defaults.baseURL}/subscriptions/${subId}/documents/${docType}`;
    };

    // ✅ OPTIONAL: fetch document (if you want blob download)
    const fetchDocument = async (subId, docType) => {
        try{
            const res = await axiosInstance.get(
            `/subscriptions/${subId}/documents/${docType}`,
            { responseType: 'blob' }
        );
        return res.data;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to change status"
        );
        }
    };

    // const getAllMails = async () => {
    //     const res = await axiosInstance.get('/subscriptions/mails');

    // }

        const searchSubName = async (key) => {
            if (!key.trim()) {
                throw new Error("Enter the value for the search");
            }
            try{
                const res = await axiosInstance.get(`/subscriptions/search?name=${key}`);
                return res.data?.data?.subscriptions;
            }catch(err){
                throw new Error(
                err.response?.data?.message || 
                err.message || 
                "Failed to search"
            );
            };
        };

        const searchSubStatus = async (key) => {
            if (!key.trim()) {
                throw new Error("Enter the value for the search");
            }
            try{
                const res = await axiosInstance.get(`/subscriptions/search?status=${key}`);
                return res.data?.data?.subscriptions;
            }catch(err){
                throw new Error(
                err.response?.data?.message || 
                err.message || 
                "Failed to search"
            );
            };
        };

    return{
        getAllSubscriptions,
        changeStatus,
        getDocumentUrl,
        fetchDocument,
        searchSubName,
        searchSubStatus
    };
};
