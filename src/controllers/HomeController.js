import axiosInstance from '../services/axiosInstance';

export const HomeController = () => {
    
    const allLocation = async () => {
        try{
            const res = await axiosInstance.get('/alllocations');
            if(!res)
                throw new Error('No location data!!');
            return res?.data;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }

//     const allLocation = async (signal) => {
//     try {
//         const res = await axiosInstance.get('/alllocations', { signal });
//         if (!res) throw new Error('No location data!!');
//         return res?.data;
//     } catch (err) {
//         throw new Error(err.response?.data?.message || err.message);
//     }
// }

    const ticketAnalysis = async () => {
        try{
            const res = await axiosInstance.get('/ticketanalysis');
            if(!res)
                throw new Error('No ticket analysis result.');
            return res?.data?.data;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }
    
    const subscriptionAnalysis = async () => {
        try{
            const res = await axiosInstance.get('/subscriptionanalysis');
            if(!res)
                throw new Error('No subscription analysis result.');
            return res?.data?.data;
        }catch(err){
            throw new Error(
            err.response?.data?.message || 
            err.message 
        );
        }
    }

    return{
        allLocation,
        ticketAnalysis,
        subscriptionAnalysis,
    }
}
