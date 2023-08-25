import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Data from '../../types/Data.type.ts'





export default function ForecastWeather(props: any) {

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    }, []);


    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q:  props.city,
                days: 1
            }
        })
        return response.data;
    }


    return(
        <>
            <Card className='weatherCard' sx={{ boxShadow: 5, borderRadius: 4, marginTop: 5, marginLeft: 16}}>
                <CardContent className='weatherCardCont'>
                    
                    <Typography sx={{ fontSize: 24, width: 370, padding: 3 }} >
                        {weatherInfo?.location.name} 
                    </Typography>

                    <Typography className='currentImage'>
                        <img src={weatherInfo?.current.condition.icon} width={150} height={150} />
                    </Typography>

                    <Typography sx={{ fontSize: 24, width: 300, padding: 3, paddingTop: 2 }} >
                        {weatherInfo?.location.country} 
                    </Typography>

                    <Typography sx={{ fontSize: 24, width: 550, paddingLeft: 3 }} >
                        {weatherInfo?.current.temp_c}ºC
                    </Typography>

                    <Typography sx={{ fontSize: 24, width: 400, paddingLeft: 3 }}>
                        {weatherInfo?.current.condition.text}
                    </Typography>
                    <Button size="medium" variant="contained" className='btnMoreInfo' sx={{ borderRadius: 7, opacity: '60%' }}> More Info </Button>    

                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
        
        </>

    );


}
