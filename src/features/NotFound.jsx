import React from 'react'
import '../styles/StylePages.css'

function NotFound() {
    return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <h1 className='txtTitle'>404 - Page Not Found</h1>
            <p className='txtLabel'>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFound
