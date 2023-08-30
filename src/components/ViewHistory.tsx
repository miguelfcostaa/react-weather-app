import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';


export default function ViewHistory() {

    const [ location, setLocation ] = useState<any[]>([]);
    const [ country, setCountry ] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            setLocation(JSON.parse(localStorage.getItem("location") || '{}'));
            setCountry(JSON.parse(localStorage.getItem("country") || '{}'));
        })();
    })  
    
    const renderHistory = () => {
        
        const list = [];

        for (let i = 0; i < location.length; i++) {
            list.push(
                <Link to={"/search/" + location[i] + "/" + 7}  style={{ color: 'black', textDecoration: 'none'}}>
                    <li style={{ paddingTop: '10px'}} key={i}>{location[i]}, {country[i]}  </li>
                </Link>
            );
        }    
        return list;
    }

    return (
        <>
            <NavBar />
            <Box className="whiteBoxHistory" sx={{maxWidth: '1250px' }}>
                <h1 style={{ padding: 25 }}>History</h1>
                <hr></hr>
                <ul style={{fontSize: 22, paddingLeft: '4rem', overflow: 'auto', maxHeight: '720px' }}> 
                    {renderHistory()}
                </ul>
            </Box>
        </>
    );
}
