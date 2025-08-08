import { Loader } from "@googlemaps/js-api-loader"
import { useRef, useEffect, useState, useCallback } from 'react'
import PlaceCard from '../place-card/Placecard.jsx'
import styles from './App.module.css'
import classNames from "classnames";
import CoreInput from "../CoreInput/CoreInput.jsx";

function App() {
  const mapRef = useRef(null);
  const mapElement = useRef(null);
  const [query, setQuery] = useState("");
  const [list, setList] = useState({});
  const [places, setPlaces] = useState({});
  const markerRef = useRef({})
  const listRef = useRef({})
  const placesRef = useRef({})

  useEffect(() => {
    document.title = "App";
  }, []);

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
        zoomControl: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapId: 'biggy',
      });

      mapRef.current = map;
    })
  }, [])

  useEffect(() => {
    listRef.current = list
  }, [list])

  useEffect(() => {
    placesRef.current = places
  }, [places])

  const handleSearch = async () => {
    const { Place, PlaceDetailsCompactElement } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    const request = {
      textQuery: query,
      fields: ['displayName', 'location', 'formattedAddress', 'rating'],
      region: 'jp',
    }

    const { places } = await Place.searchByText(request);
    // const placesQuery = [
    //   {
    //     "id": "ChIJq_fYt4iLGGARrOojmQ4IMyE",
    //     "displayName": "Starbucks Reserve Roastery Tokyo",
    //     "location": {
    //       "lat": 35.6492642,
    //       "lng": 139.69259069999998
    //     },
    //     "formattedAddress": "2-chōme-19-23 Aobadai, Meguro City, Tokyo 153-0042",
    //     "rating": 4.5
    //   },
    //   {
    //     "id": "ChIJL0MSsuaLGGARFMGsCD4gT_0",
    //     "displayName": "Starbucks Reserve® Store - Ginza Marronnier-dori Street",
    //     "location": {
    //       "lat": 35.6722648,
    //       "lng": 139.7675641
    //     },
    //     "formattedAddress": "〒104-0061 Tokyo, Chuo City, Ginza, 3-chōme−7−３ Ginza Omi Bldg., 1F",
    //     "rating": 4
    //   },
    //   {
    //     "id": "ChIJ30G_l3iLGGARYNilOEO6xVI",
    //     "displayName": "Starbucks Reserve - Tokyo Midtown",
    //     "location": {
    //       "lat": 35.6650037,
    //       "lng": 139.7307146
    //     },
    //     "formattedAddress": "〒107-0052 Tokyo, Minato City, Akasaka, 9-chōme−7−２ 東京ミッドタウンB0103",
    //     "rating": 4
    //   }
    // ]
    if (places.length) {
      const formattedPlaces = {}
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds()

      places.forEach((place) => {
        const marker = new AdvancedMarkerElement({
          map: mapRef.current,
          position: place.location,
          title: place.displayName,
          gmpClickable: true,
          content: new PinElement({
            background: "#FFE5B4",
            borderColor: "#FF9800",
            glyphColor: "#E65100"
          }).element
        });

        marker.addEventListener("gmp-click", () => {
          handleMarkerClick(place.id);
        })

        formattedPlaces[place.id] = {
          name: place.displayName,
          address: place.formattedAddress,
          rating: place.rating,
          id: place.id
        }

        markerRef.current[place.id] = marker;
        bounds.extend(place.location)
      })
      setPlaces(formattedPlaces)
      mapRef.current.fitBounds(bounds)
    }
  }

  const handleAdd = async (placeId) => {
    const prevPlace = placesRef.current[placeId];
    const { PinElement } = await google.maps.importLibrary("marker")
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

    markerRef.current[placeId].content = new PinElement({
      background: "#D1F5D3",
      glyphColor: "#2E7D32",
      borderColor: "#4CAF50",
      scale: 1.5,
    }).element
    console.log(markerRef.current[placeId])
  }

  const handleRemove = async (placeId) => {
    const prevPlace = listRef.current[placeId];
    const { PinElement } = await google.maps.importLibrary("marker")

    setPlaces(prev => {
      const updatedPlaces = { ...prev };
      updatedPlaces[placeId] = prevPlace;
      return updatedPlaces;
    })

    setList(prev => {
      const updatedList = { ...prev };
      delete updatedList[placeId];
      return updatedList;
    })

    markerRef.current[placeId].content = new PinElement({
      background: "#FFE5B4",
      borderColor: "#FF9800",
      glyphColor: "#E65100"
    }).element
  }

  const handleMarkerClick = useCallback((placeId) => {
    if (placesRef.current[placeId] && !listRef.current[placeId]) {
      handleAdd(placeId)
    } else if (listRef.current[placeId] && !placesRef.current[placeId]) {
      handleRemove(placeId)
    }
  }, [])

  const conditionalHeight = classNames({
    [styles.noList]: Object.keys(list).length === 0,
    [styles.potentialList]: Object.keys(list).length !== 0
  })

  const handleCalculateRoute = () => {
    const directionsService = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer()
    const waypointsPlaceObjects = Object.values(list)

    //Temporary
    const originId = waypointsPlaceObjects[0].id
    const destinationId = waypointsPlaceObjects[waypointsPlaceObjects.length - 1].id

    const requestBody = {
      origin: { placeId: originId },
      destination: { placeId: destinationId },
      travelMode: 'DRIVING',
      provideRouteAlternatives: true,
    }

    directionsService.route(requestBody, (res, status) => {
      console.log(res)
      if (status == "OK") {
        directionsRenderer.setMap(mapRef.current)
        directionsRenderer.setDirections(res);
      }
    })

    setPlaces({})
    setQuery("")

    const currentMarkers = markerRef.current
    const currentMarkerIds = Object.keys(currentMarkers)

    currentMarkerIds.forEach((id) => {
      if (id !== originId && id !== destinationId) {
        currentMarkers[id].setMap(null)
        delete currentMarkers[id]
      }
    })

    markerRef.current = currentMarkers

  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.appContainer}>
          <div className={styles.sidebar}>
            {Object.keys(list).length !== 0 && <div className={styles.list}>
              {Object.keys(list).length > 0 && (
                <div className={styles.cardList}>
                  {Object.keys(list).map((placeId) => (
                    <PlaceCard key={placeId} place={list[placeId]} onRemove={handleRemove} isList={true} />
                  ))}


                </div>
              )}
              {Object.keys(list).length >= 2 && <button className={styles.calButton} onClick={handleCalculateRoute}><h2>Calculate Route</h2></button>}
            </div>}

            <div className={conditionalHeight}>
              {(Object.keys(places).length === 0 && Object.keys(list).length === 0) && <h2 style={{color: "#000"}}>Where are we headed off to?</h2>}
              {(Object.keys(list).length !== 0 && Object.keys(places).length === 0) && <h2>Where else?</h2>}
              <form className={styles.searchForm} action="" onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}>
                <input type="text" className={styles.placeSearch} value={query} onChange={(e) => setQuery(e.target.value)} />
              </form>

              {Object.keys(places).length > 0 && (
                <div className={styles.cardList}>
                  {Object.keys(places).map((placeId, index) => (
                    <PlaceCard key={index} place={places[placeId]} onAdd={handleAdd} isList={false} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.maps} ref={mapElement} />
        </div>

      </div>
    </>
  )
}

export default App