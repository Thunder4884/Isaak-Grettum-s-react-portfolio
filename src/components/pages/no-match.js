import React from 'react';
import { Link } from "react-router-dom";

export default function() {
    return (
        <div>
            <h2>Error 404 page not found</h2>
            <Link to="/">Return to homepage</Link>
        </div>
    );
}