import React from 'react';
import styles from './List.module.css';

function List({stores}) {
    return (
        <div className={styles.listContainer}>
            {stores.map(store => (
                <div className={styles.listItem} key={store.id}>
                    <img className={styles.storeImage} src={store.image_url} alt={store.name}/>
                    <div className={styles.storeDetails}>
                        <h3>{store.name}</h3>
                        <p>{store.location.city}, {store.location.state}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default List;