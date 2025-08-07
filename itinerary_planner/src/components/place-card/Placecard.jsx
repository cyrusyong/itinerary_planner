import styles from './Placecard.module.css'

function PlaceCard({ place, onAdd, onRemove, isList }) {
    return (
        <div className={styles.placeCard}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <div className={styles.placeButtonContainer}>
                {isList ?
                    <button className={styles.placeRemoveButton} onClick={() => {
                        onRemove(place.id)
                    }}>-</button>
                    :
                    <button className={styles.placeAddButton} onClick={() => {
                        onAdd(place.id)
                    }}>+</button>}
            </div>
        </div>
    )
}

export default PlaceCard