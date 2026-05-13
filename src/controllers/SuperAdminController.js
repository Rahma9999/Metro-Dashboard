import axiosInstance from "../services/axiosInstance";

export const SuperAdminController = () => {

    const getAdmins = async () => {
        try{
            const res = await axiosInstance.get('/admins');
            return res.data.data || [];
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to get all admins"
        );
        }
    };
    
    const addAdmin = async (data) => {
        try{
            await axiosInstance.post('/admins', data);
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to create admin"
        );
        }
    }

    const deleteAdmin = async (id) => {
        try{
            await axiosInstance.delete(`/admins/${id}`)
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to delete admin"
        );
        }
    };

    return{
        getAdmins,
        addAdmin,
        deleteAdmin, 
    }
};