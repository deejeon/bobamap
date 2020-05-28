import React from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';

import styles from './Map.module.css';

function Map(props) {
    let ref;

    function centerHandler() {
        let center = [ref.getCenter().lat(), ref.getCenter().lng()];
        props.setCoordinates(center);
        props.setRedo(true);
        props.setUseLocation(false);
    }

    return (
        <GoogleMap
            ref={(mapRef) => ref = mapRef}
            defaultZoom={13}
            defaultCenter={{lat: props.coordinates[0], lng: props.coordinates[1]}}
            onCenterChanged={centerHandler}
            center={{lat: props.coordinates[0], lng: props.coordinates[1]}}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
            }}
        >
            {props.stores.map(store => (
                <Marker
                    key={store.id}
                    position={{lat: store.coordinates.latitude, lng: store.coordinates.longitude}}
                    onClick={() => props.setSelectedStore(store)} />
            ))}

            {props.selectedStore &&
                <InfoWindow
                    position={{lat: props.selectedStore.coordinates.latitude, lng: props.selectedStore.coordinates.longitude}}
                    onCloseClick={() => props.setSelectedStore(null)}
                >
                    <div>
                        <img className={styles.infoImage} src={props.selectedStore.image_url} alt={props.selectedStore.name}/>
                        <h3>{props.selectedStore.name}</h3>
                    </div>
                </InfoWindow>
            }

        </GoogleMap>
    );
}

export default Map;