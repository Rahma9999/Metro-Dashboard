import React, { useContext, useState } from 'react';
import "../styles/Sidebar.css";
import logo from '../assets/images/cairoMetro.jpeg';
import { FaDelicious, FaChartPie, FaRegClock, FaCog, FaSignOutAlt, FaTrain } from "react-icons/fa";
import { FaTicket } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

function Sidebar() {

    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = (e) => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) {
            e.preventDefault();
            return;
        }
        logout();
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Top Navbar */}
            <div className="mobile-navbar">
                <button className='p-1 px-2' onClick={() => setIsOpen(!isOpen)}>☰</button>
                <span className="mobile-title fw-semibold">Metro Dashboard</span>
            </div>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <img src={logo} alt="logo" className="logo rounded-circle" />

                <ul className="menu">
                    <li>
                        <NavLink to='/' onClick={closeSidebar}>
                            <FaDelicious />
                                <span className='ms-1 fw-semibold'>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/station' onClick={closeSidebar}>
                            <FaTrain />
                            <span className='ms-1 fw-semibold'>Stations</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/ticket' onClick={closeSidebar}>
                            <FaTicket />
                            <span className='ms-1 fw-semibold'>Tickets</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/sub' onClick={closeSidebar}>
                            <FaChartPie />
                            <span className='ms-1 fw-semibold'>Subscription</span>
                        </NavLink>
                    </li>
                </ul>

                <ul className="menu bottom-menu">
                    <li>
                        <NavLink to='/settings' onClick={closeSidebar}>
                            <FaCog />
                            <span className='ms-1 fw-semibold'>Settings</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/' onClick={handleLogOut}>
                            <FaSignOutAlt />
                            <span className='ms-1 fw-semibold'>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;