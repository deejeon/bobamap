import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

import Map from '../components/Map';
import List from '../components/List';

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Main() {
    const [bobaStores, setBobaStores] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [hasError, setHasError] = useState(false);

    const [redo, setRedo] = useState(false);
    const [useLocation, setUseLocation] = useState(false);
    const [coordinates, setCoordinates] = useState([34.052235, -118.243683]);

    const apiKey = "b1i6qmDhVkqUr5PDBEGI70HX1bdBvDsrTI-IX5hvEVoTpfpEtwXH0CaoFJlbHZBTv3nNdsTWx4ZWFdIzXeBBGHi5pzuFwezxOOQUuQIWcvzwWJh1nkp5Iwc3h7PNXnYx";
    const baseUrl = "https://api.yelp.com/v3/businesses/search";
    const herokuapp = "https://cors-anywhere.herokuapp.com/";
    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        params: {
            term: 'boba tea bubble',
            categories: 'bubbletea,coffee,tea,juicebars',
            latitude: coordinates[0],
            longitude: coordinates[1],
            limit: 20,
            radius: 10000,
            sort_by: 'distance'
        }
    }

    useEffect(() => {
        axios.get(`${herokuapp}${baseUrl}`, config)
            .then(response => {
                setBobaStores(response.data.businesses);
                setRedo(false);
            })
            .catch(() => setHasError(true));
    }, [redo]);
    
    if(hasError) return 'Something went wrong!';
    
    if(bobaStores === null) return 'Loading...';

    return (
        <div style={{ width: '100vw', height: '80vh', display: 'flex' }}>
            <div style={{ width: '70%', height: '100%' }}>
                <WrappedMap
                    stores={bobaStores}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                    setRedo={setRedo}
                    setUseLocation={setUseLocation}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBpqATVf2iYNv_6ibbwOFUpFPLKuJQfRKo`}
                    loadingElement={<div style={{ height: "100% "}} />}
                    containerElement={<div style={{ height: "100% "}} />}
                    mapElement={<div style={{ height: "100% "}} />}
                />
            </div>
            <List
                stores={bobaStores}
                useLocation={useLocation}
                setUseLocation={setUseLocation}
                setCoordinates={setCoordinates}
                setRedo={setRedo}
            />
        </div>
    )
}