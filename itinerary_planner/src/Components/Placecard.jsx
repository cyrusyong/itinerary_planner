function PlaceCard({ place }) {
    return (
        <div className="place-card">
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>{place.rating} Stars</p>
        </div>
    )
}

export default PlaceCard