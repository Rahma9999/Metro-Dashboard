import React from 'react';
import '../styles/Layout.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;