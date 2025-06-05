import styles from '../Styles/Placecard.module.css'

function PlaceCard({ place, onAdd, onRemove, isList }) {
    return (
        <div className={styles.placeCard}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>{place.rating} Stars</p>
            <div className={styles.placeButtonContainer}>
                {isList ?
                    <button id={styles.placeRemoveButton} onClick={() => {
                        onRemove(place.id)
                    }}>-</button>
                    :
                    <button id={styles.placeAddButton} onClick={() => {
                        onAdd(place.id)
                    }}>+</button>}
            </div>
        </div>
    )
}

export default PlaceCard