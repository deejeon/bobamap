import React from 'react';
import { Link } from '@reach/router';
import styles from './List.module.css';

function List({stores, useLocation, setUseLocation, setCoordinates, setRedo}) {
    function locationHandler() {
        const geolocation = navigator.geolocation;
        function findLocal(position) {
            setCoordinates([position.coords.latitude, position.coords.longitude]);setUseLocation(true);
            setRedo(true);
        }
        function showError() {
            console.log(Error)
        }
        if (geolocation) {
            geolocation.getCurrentPosition(findLocal, showError);
        }
    }

    return (
        <div className={styles.listContainer}>
            {!useLocation &&
                <button onClick={locationHandler}>Use my location</button>
            }
            {stores.map(store => (
                <Link className={styles.link} to={"/stores/"+store.id}>
                    <div className={styles.listItem} key={store.id}>
                        <img className={styles.storeImage} src={store.image_url} alt={store.name}/>
                        <div className={styles.storeDetails}>
                            <h3>{store.name}</h3>
                            <span>{store.location.city}, {store.location.state}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default List;