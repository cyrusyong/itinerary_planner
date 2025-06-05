import { Loader } from "@googlemaps/js-api-loader"
import { useRef, useEffect, useState } from 'react'
import PlaceCard from './Placecard.jsx'
import styles from '../Styles/App.module.css'

function App() {
  const mapRef = useRef(null);
  const mapElement = useRef(null);
  const [query, setQuery] = useState("");
  const [list, setList] = useState({});
  const [places, setPlaces] = useState({});

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
        mapId: 'biggy',
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

    // const { places } = await Place.searchByText(request);
    const placesQuery = [
      {
        "id": "ChIJq_fYt4iLGGARrOojmQ4IMyE",
        "displayName": "Starbucks Reserve Roastery Tokyo",
        "location": {
          "lat": 35.6492642,
          "lng": 139.69259069999998
        },
        "formattedAddress": "2-chōme-19-23 Aobadai, Meguro City, Tokyo 153-0042",
        "rating": 4.5
      },
      {
        "id": "ChIJL0MSsuaLGGARFMGsCD4gT_0",
        "displayName": "Starbucks Reserve® Store - Ginza Marronnier-dori Street",
        "location": {
          "lat": 35.6722648,
          "lng": 139.7675641
        },
        "formattedAddress": "〒104-0061 Tokyo, Chuo City, Ginza, 3-chōme−7−３ Ginza Omi Bldg., 1F",
        "rating": 4
      },
      {
        "id": "ChIJ30G_l3iLGGARYNilOEO6xVI",
        "displayName": "Starbucks Reserve - Tokyo Midtown",
        "location": {
          "lat": 35.6650037,
          "lng": 139.7307146
        },
        "formattedAddress": "〒107-0052 Tokyo, Minato City, Akasaka, 9-chōme−7−２ 東京ミッドタウンB0103",
        "rating": 4
      }
    ]
    if (placesQuery.length) {
      const formattedPlaces = {}
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds()

      placesQuery.forEach((place) => {
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

        formattedPlaces[place.id] = {
          name: place.displayName,
          address: place.formattedAddress,
          rating: place.rating,
          id: place.id
        }

        bounds.extend(place.location)
      })
      setPlaces(formattedPlaces)
      mapRef.current.fitBounds(bounds)

    }
  }

  const handleAdd = (placeId) => {
    const prevPlace = places[placeId];
    setPlaces(prev => {
      const updatedPlaces = { ...prev };
      delete updatedPlaces[placeId];
      return updatedPlaces;
    })

    setList(prev => {
      const updatedList = { ...prev };
      updatedList[placeId] = prevPlace
      return updatedList;
    })


  }

  const handleRemove = (placeId) => {
    setList(prev => {
      const updatedList = { ...prev };
      delete updatedList[placeId];
      return updatedList;
    })
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.appContainer}>
          <div className={styles.sidebar}>
            <div className={styles.list}>
              {Object.keys(list).length > 0 && (
                <div className={styles.cardList}>
                  {Object.keys(list).map((placeId) => (
                    <PlaceCard key={placeId} place={list[placeId]} onRemove={handleRemove} isList={true}/>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.potentialList}>
              {Object.keys(places).length === 0 && <h2>Where are we headed off to?</h2>}
              <form className={styles.searchForm} action="" onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}>
                <input type="text" className={styles.placeSearch} value={query} onChange={(e) => setQuery(e.target.value)} />
              </form>

              {Object.keys(places).length > 0 && (
                <div className={styles.cardList}>
                  {Object.keys(places).map((placeId, index) => (
                    <PlaceCard key={index} place={places[placeId]} onAdd={handleAdd} isList={false}/>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.maps} ref={mapElement} />
        </div>

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