import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
            q: 'London',
            days: 7
        }
    })
    console.log("7DAY - RESPOSTA: ", response.data);
    return response.data;
}

export default function NextDaysForecast() {

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    }, []);

    console.log("7day - DEPOIS DE USAR NO USE-STATE", weatherInfo )

    return(
        <>
            <div className='flexForecastCards'>
            {weatherInfo?.forecast?.forecastday?.map((data: Forecastday) => 
                <Card className='forecastCard' sx={{ boxShadow: 5, borderRadius: 4 }}>
                        <CardContent className='forecastCardCont'>

                            
                            <Typography sx={{ fontSize: 18, textAlign: 'center' }}>
                                {data.date}
                            </Typography>

                            <Typography sx={{ fontSize: 24, textAlign: 'center', paddingTop: 5 }}>
                                {data.day.avgtemp_c} ºC
                            </Typography>

                            <img src={data.day.condition.icon} width={110} height={110} className='forecastImages' />

                            

                            <Typography sx={{ fontSize: 24, textAlign: 'center', paddingBottom: 6 }}>
                                {data.day.condition.text}
                            </Typography>

                            

                            

                        </CardContent>
                        <CardActions>
                            <Button size="medium" sx={{ left: 50 }}> More </Button>
                        </CardActions>
                </Card>
            )}
            </div>                
        </>
    );
}