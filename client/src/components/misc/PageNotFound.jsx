import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div id="page-not-found">
            <h3>404: Page not found</h3>

            <Link to='/'>
                Go back to homepage
            </Link>
        </div >
    )
}

export default PageNotFound;