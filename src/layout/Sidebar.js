import React, { useContext, useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import logo from '../assets/images/cairoMetro.jpeg';
import {
    FaDelicious, FaCog, FaSignOutAlt, FaTrain,
} from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import { MdMail, MdOutlineDocumentScanner, MdOutlineManageAccounts } from 'react-icons/md';

const NAV_LINKS = [
    { to: '/',         icon: <FaDelicious />, label: 'Home'         },
    { to: '/station',  icon: <FaTrain />,     label: 'Stations'     },
    { to: '/ticket',   icon: <FaTicket />,    label: 'Tickets'      },
    { to: '/sub',      icon: <MdOutlineManageAccounts />,  label: 'Members' },
    { to: '/request',      icon: <MdOutlineDocumentScanner />,  label: 'Requests' },
    { to: '/mail',      icon: <MdMail />,  label: 'Mails' },
];

const BOTTOM_LINKS = [
    { to: '/settings', icon: <FaCog />, label: 'Settings' },
];

function Sidebar() {
    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 768) setIsOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleLogout = (e) => {
        if (!window.confirm('Are you sure you want to logout?')) {
            e.preventDefault();
            return;
        }
        logout();
    };

    return (
        <>
            <nav className="mobile-topbar" aria-label="Mobile navigation">
                <button
                    className="hamburger"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
                <span className="mobile-title fw-semibold">Metro Dashboard</span>
            </nav>

            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <img src={logo} alt="Cairo Metro logo" className="logo rounded-circle" />

                <ul className="menu" role="navigation" aria-label="Main navigation">
                    {NAV_LINKS.map(({ to, icon, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) => isActive ? 'active' : undefined}
                            >
                                {icon}
                                <span className="ms-1 fw-semibold">{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="menu bottom-menu" role="navigation" aria-label="Account navigation">
                    {BOTTOM_LINKS.map(({ to, icon, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => isActive ? 'active' : undefined}
                            >
                                {icon}
                                <span className="ms-1 fw-semibold">{label}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <NavLink to="/" onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span className="ms-1 fw-semibold">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;