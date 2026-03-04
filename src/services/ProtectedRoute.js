import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute() {
    const {isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    return <Outlet />  

}

export default ProtectedRoute;