import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

export default function SingleStore({ id }) {
    const [currentStore, setCurrentStore] = useState(null);
    const [hasError, setHasError] = useState(false);

    const apiKey = "b1i6qmDhVkqUr5PDBEGI70HX1bdBvDsrTI-IX5hvEVoTpfpEtwXH0CaoFJlbHZBTv3nNdsTWx4ZWFdIzXeBBGHi5pzuFwezxOOQUuQIWcvzwWJh1nkp5Iwc3h7PNXnYx";
    const baseUrl = "https://api.yelp.com/v3/businesses/" + id;
    const herokuapp = "https://cors-anywhere.herokuapp.com/";
    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    }

    useEffect(() => {
        axios.get(`${herokuapp}${baseUrl}`, config)
            .then(response => {
                setCurrentStore(response.data);
            })
            .catch(() => setHasError(true));
    }, [id]);
    
    if(hasError) return 'Something went wrong!';
    
    if(currentStore === null) return 'Loading...';

    return (
        <div className="single-store">
            <h1 className="single-store-name">{currentStore.name}</h1>
            <div className="single-store-photos-container">
                <img className="single-store-photo" src={currentStore.photos[0]} alt="1"/>
                <img className="single-store-photo" src={currentStore.photos[1]} alt="2"/>
                <img className="single-store-photo" src={currentStore.photos[2]} alt="3"/>
            </div>
            <div className="single-store-details-container">
                <div className="single-store-location">
                    <h2>Location:</h2>
                    {currentStore.location.display_address.map((line, i) => (
                    <p className="single-store-location-line" key={i}>{line}</p>
                    ))}
                </div>
                <div className="single-store-hours">
                    <h2>Hours:</h2>
                    {currentStore.hours[0].open.map((day, i) => {
                        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                        let startType;
                        let endType;
                        parseInt(day.start) > 1259 ? startType = "pm" : startType = "am";
                        parseInt(day.end) > 1259 ? endType = "pm" : endType = "am";

                        let startHour = Math.floor((parseInt(day.start) / 100) % 12);
                        if (Math.floor(parseInt(day.start) / 100) === 12) startHour = 12;
                        let startMinutes = parseInt(day.start) % 100;
                        const startTime = startHour + ":" + startMinutes + " " + startType;
                        
                        let endHour = Math.floor((parseInt(day.end) / 100) % 12);
                        if (Math.floor(parseInt(day.end) / 100) === 12) endHour = 12;
                        let endMinutes = parseInt(day.end) % 100;
                        if (endMinutes === 0) endMinutes += "0";
                        const endTime = endHour + ":" + endMinutes + " " + endType;
                        
                        return (
                            <p className="single-store-hours-line">
                                <span className="single-store-hours-day">{days[day.day]} </span><span className="single-store-hours-time">{startTime} - {endTime}</span>
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}