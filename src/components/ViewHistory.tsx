import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

let location: any[] = []
let country: any[] = []

export default function ViewHistory() {

    useEffect(() => {
        (async () => {
            location = JSON.parse(localStorage.getItem("location") || '{}');
            country = JSON.parse(localStorage.getItem("country") || '{}');
            console.log(country)
            console.log(location)
        })();
    }, [])  
    
    const renderHistory = () => {
        
        const list = [];

        for (let i = 0; i < location.length; i++) {
            list.push(
                <Link to={"/search/" + location[i] + "/" + 7}  style={{ color: 'black', textDecoration: 'none'}}>
                    <li style={{ paddingTop: '10px'}} key={i}>{location[i]}, {country[i]}  </li>
                </Link>
            );
        }    
        // console.log(list)
        return list;
    }

    return (
        <>
            <NavBar />
            <Box className="whiteBoxHistory">
                <h1 style={{ padding: 25 }}>History</h1>
                <hr></hr>
                <ul style={{fontSize: 22, paddingLeft: '4rem'}}> 
                    {renderHistory()}
                </ul>
            </Box>
        </>
    );
}