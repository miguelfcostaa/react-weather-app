import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Weather from "./weather/Weather.tsx";
import { Link } from 'react-router-dom';


export default function SearchField() {


    const [ searchField, setSearchField ] = useState('');


    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchField = e.target.value;
        setSearchField(searchField);
    };

    const findByField = () => {
        axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: searchField,
                days: 7
            }
        })
        .then((response) => {
            console.log("HEY", response.data)
            return response.data;
        })
    }


    return (
    <>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            
            <Box sx={{marginTop: 5, marginLeft: 35, boxShadow: 5, borderRadius: 4 }} className='searchBox'>
                <input 
                    id="field" 
                    className='searchField' 
                    placeholder='Search a Location...'
                    value={searchField}
                    onChange={onChangeSearch}
                />
                
                <IconButton aria-label="search" onClick={findByField}>
                    <Link to={'/search/' + searchField} >
                        <SendIcon />
                    </Link>
                </IconButton>
            </Box>
            <Weather />

        </div>
        

    </>
    );
}