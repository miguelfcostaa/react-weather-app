import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

type Forecastday = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        daily_chance_of_rain: number;
        condition: {
            text: string;
            icon: string;
        }
    }
    uv: number;
    hour: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
        precip_mm: number;
        humidity: number;
        feelslike_c: number;
        chance_of_rain: number;
        uv: number;
    }
}

type Data = {
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
        wind_mph: number;
        feelslike_c: number;
        humidity: number;
        uv: number;
    }
    forecast: {
        forecastday: Forecastday[];
    }
    location: {
        name: string;
        region: string;
        country: string;
    }
}

async function getWeatherInfo(): Promise<any> {
    const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
        params: {
            key: process.env.REACT_APP_API_KEY,
            q: document.getElementById('searchField'),
            days: 7
        }
    })
    return response.data;
}


export default function searchField() {
  return (
    <>
        <Box sx={{marginTop: 5, marginLeft: 35, boxShadow: 5, borderRadius: 4 }} className='searchBox'>
            <input id="seachField" className='searchField' placeholder='Search a Location...'/>
            
            <IconButton aria-label="search">
                <SendIcon />
            </IconButton>
            
        </Box>
    </>
    );
}