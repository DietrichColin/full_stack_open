import React from 'react';
import axios from 'axios';

const Print = (props) => {
    console.log("yo");
    console.log(props.weather.current);

    return (
        <div>
            <h1>{props.country.name}</h1>
            <p>
                capital {props.country.capital} <br/>
                population {props.country.population}
            </p>
            <h2>Spoken languages</h2>
            <ul>
                {
                    props.country.currencies.map(value => {
                        return (
                            <li key={value.name}>{value.name}</li>
                        );
                    })
                }
            </ul>
            <img src={props.country.flag} width="200"/>
            <h2>Weather in {props.country.name}</h2>
            <p>
                temperature: {props.weather.current.temperature} <br/>
                <img src={props.weather.current.weather_icons}/> <br/>
                wind: {props.weather.current.wind_speed}
            </p>
        </div>
    );
}

export default Print;