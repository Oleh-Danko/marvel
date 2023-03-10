import React from 'react';
import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={img} alt="error" 
            style={{display: 'block', margin: '0 auto', width: 250, height: 250, objectFit: 'contain'}}/>
    )
}

export default ErrorMessage 