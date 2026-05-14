import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { AppLoader } from "../component/AppLoader";

function ProtectedRoute() {
    const {isAuthenticated, loading} = useContext(AuthContext);

    if (loading) return <AppLoader />;

    if(!isAuthenticated)
        return <Navigate to="/login" replace />;
    
    return <Outlet />  

}

export default ProtectedRoute;