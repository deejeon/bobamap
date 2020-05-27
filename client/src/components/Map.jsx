import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

function Map(props) {
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat: props.coordinates[0], lng: props.coordinates[1]}}
        >
            {props.stores.map(store => (
                <Marker
                    key={store.id}
                    position={{lat: store.coordinates.latitude, lng: store.coordinates.longitude}} />
            ))}
        </GoogleMap>
    );
}

export default Map;