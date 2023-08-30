import React, { useState, useEffect } from 'react';
import "../../src/countries.css"
import NavBar from './NavBar';
import Data from '../types/Data.type';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewCities() {

    const [ portugalInfo, setPortugalInfo ] = useState<Data>();
    const [ spainInfo, setSpainInfo ] = useState<Data>();
    const [ franceInfo, setFranceInfo ] = useState<Data>();
    const [ englandInfo, setEnglandInfo ] = useState<Data>();
    const [ germanyInfo, setGermanyInfo ] = useState<Data>();
    const [ italyInfo, setItalyInfo ] = useState<Data>();
    const [ norwayInfo, setNorwayInfo ] = useState<Data>();
    const [ netherlandsInfo, setNetherlandsInfo ] = useState<Data>();
    const [ belgiumInfo, setBelgiumInfo ] = useState<Data>();
    const [ switzerlandInfo, setSwitzerlandInfo ] = useState<Data>();

    useEffect(() => {
        (async () => {
            const portugalInfo = await getInfo("Portugal");
            setPortugalInfo(portugalInfo);

            const spainInfo = await getInfo("Spain");
            setSpainInfo(spainInfo);
                  
            const franceInfo = await getInfo("France");
            setFranceInfo(franceInfo);
                  
            const englandInfo = await getInfo("England");
            setEnglandInfo(englandInfo);
                  
            const germanyInfo = await getInfo("Germany");
            setGermanyInfo(germanyInfo);
                  
            const italyInfo = await getInfo("Italy");
            setItalyInfo(italyInfo);
            
            const norwayInfo = await getInfo("Norway");
            setNorwayInfo(norwayInfo);
             
            const netherlandsInfo = await getInfo("Netherlands");
            setNetherlandsInfo(netherlandsInfo);
            
            const belgiumInfo = await getInfo("Belgium");
            setBelgiumInfo(belgiumInfo);

            const switzerlandInfo = await getInfo("Switzerland");
            setSwitzerlandInfo(switzerlandInfo);
        })();
    });


    async function getInfo(country: string): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: country,
                days: 1
            }
        })
        return response.data;
    }



    return (
        <>
            <NavBar />
            
            <img alt='' className='europeMap'/>
            <div>
                <Link 
                    to={'/search/' + portugalInfo?.location.country + '/days/' + 7}
                    style={{ textDecoration: 'none'  }}
                >
                    <img alt='' className='portugal'/>
                </Link>
                <span className='infoBox'>
                    <p>Country: {portugalInfo?.location.country} </p>
                    <p>Condition: {portugalInfo?.current.condition.text} </p>
                    Temperature: {portugalInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='spain'></img>
                <span className='infoBox'>
                    <p>Country: {spainInfo?.location.country} </p>
                    <p>Condition: {spainInfo?.current.condition.text} </p>
                    Temperature: {spainInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='france'></img>
                <span className='infoBox'>
                    <p>Country: {franceInfo?.location.country} </p>
                    <p>Condition: {franceInfo?.current.condition.text} </p>
                    Temperature: {franceInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='england'></img>
                <span className='infoBox'>
                    <p><b>Country:</b> {englandInfo?.location.country} </p>
                    <p><b>Condition:</b> {englandInfo?.current.condition.text} </p>
                    <b>Temperature:</b> {englandInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='germany'></img>
                <span className='infoBox'>
                    <p>Country: <b>{germanyInfo?.location.country}</b> </p>
                    <p>Condition: <b>{germanyInfo?.current.condition.text}</b> </p>
                    Temperature: <b>{germanyInfo?.current.temp_c}ºC</b>
                
                </span>
            </div>
            <div>
                <img alt='' className='italy'></img>
                <span className='infoBox'>
                    <p>Country: {italyInfo?.location.country} </p>
                    <p>Condition: {italyInfo?.current.condition.text} </p>
                    Temperature: {italyInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='norway'></img>
                <span className='infoBox'>
                    <p>Country: {norwayInfo?.location.country} </p>
                    <p>Condition: {norwayInfo?.current.condition.text} </p>
                    Temperature: {norwayInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='netherlands'></img>
                <span className='infoBox'>
                    <p>Country: {netherlandsInfo?.location.country} </p>
                    <p>Condition: {netherlandsInfo?.current.condition.text} </p>
                    Temperature: {netherlandsInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='belgium'></img>
                <span className='infoBox'>
                    <p>Country: {belgiumInfo?.location.country} </p>
                    <p>Condition: {belgiumInfo?.current.condition.text} </p>
                    Temperature: {belgiumInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='switzerland'></img>
                <span className='infoBox'>
                    <p>Country: {switzerlandInfo?.location.country} </p>
                    <p>Condition: {switzerlandInfo?.current.condition.text} </p>
                    Temperature: {switzerlandInfo?.current.temp_c}ºC
                
                </span>
            </div>
        </>
    );
}