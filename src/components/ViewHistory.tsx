import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';


export default function ViewHistory() {
    
    const [ history, setHistory ] = useState()

    useEffect(() => {
        (async () => {
            const stored = JSON.parse(localStorage.getItem("History") || '{}');
            console.log(stored);
            setHistory(stored);
        })();
    }, [history])  
    

    return (
        <>
            <NavBar />
            <Box className="whiteBoxHistory">
                <h1 style={{ padding: 25 }}>History</h1>
                <hr></hr>
                <ul style={{fontSize: 20}}>                
                   <li>{history}</li>
                </ul>




            </Box>
        </>
    );
}