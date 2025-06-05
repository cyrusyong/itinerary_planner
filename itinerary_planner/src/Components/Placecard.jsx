import styles from '../Styles/Placecard.module.css'

function PlaceCard({ place }) {
    return (
        <div className={styles.placeCard}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>{place.rating} Stars</p>
            <div className={styles.placeButtonContainer}>
                <button id={styles.placeRemoveButton}>-</button>
                <button id={styles.placeAddButton}>+</button>
            </div>
        </div>
    )
}

export default PlaceCard