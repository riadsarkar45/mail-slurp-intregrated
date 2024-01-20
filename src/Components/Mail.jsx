import axios from 'axios';
import React, { useEffect } from 'react';

const Mail = ({ mails }) => {
    const { subject } = mails;
    
    return (
        <div>
            <p>{subject}</p>
            <p></p>
        </div>
    );
};

export default Mail;