import { Loader } from "@googlemaps/js-api-loader"
import { useRef, useEffect, useState } from 'react'
import PlaceCard  from './Placecard.jsx'

function App() {
  const mapRef = useRef(null);
  const mapElement = useRef(null);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
      version: "weekly"
    });

    loader.load().then(async () => {
      const { ColorScheme } = await google.maps.importLibrary("core")
      const { Map } = await google.maps.importLibrary("maps");


      const map = new Map(mapElement.current, {
        center: { lat: 35.6764, lng: 139.65 },
        zoom: 6,
        colorScheme: ColorScheme.DARK,
        mapId: 'biggy'
      });

      mapRef.current = map;
    })
  }, [])

  const handleGoToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        mapRef.current.setCenter(pos)
        mapRef.current.setZoom(16)
      })
    }
  }

  const handleSearch = async () => {
    const { Place, PlaceDetailsCompactElement } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const request = {
      textQuery: query,
      fields: ['displayName', 'location', 'formattedAddress', 'rating'],
      region: 'jp',
    }

    const { places } = await Place.searchByText(request);
    if (places.length) {
      const formattedPlaces = []
      console.log(places)
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds()

      places.forEach((place) => {
        const markerView = new AdvancedMarkerElement({
          map: mapRef.current,
          position: place.location,
          title: place.displayName,
          gmpClickable: true,
        });

        markerView.addEventListener("gmp-click", () => {
          console.log(place.displayName)
          console.log(place.formattedAddress)
          console.log(place.rating)
          console.log(place.id)
        })

        formattedPlaces.push({
          name: place.displayName,
          address: place.formattedAddress,
          rating: place.rating
        })

        bounds.extend(place.location)
        setPlaces(formattedPlaces)
      })
      mapRef.current.fitBounds(bounds)

    }
  }

  return (
    <>
      <div className="app-container">
        <div id="list">
          {places.length == 0 && <h2>Where are we headed off to?</h2>}
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}>
            <input type="text" id="place-search" value={query} onChange={(e) => setQuery(e.target.value)} />
          </form>

          {places.length > 0 && (
            <div className="card-list">
              {places.map((place, index) => (
                <PlaceCard key={index} place={place} />
              ))}
            </div>
          )}
        </div>
        <div id="maps" ref={mapElement} />
      </div>

      <button id="current-location-button" onClick={handleGoToLocation}>Go to my location</button>
      <button onClick={() => {
        console.log(query);
        handleSearch()
      }}>SEARCH</button>
    </>
  )
}

export default App