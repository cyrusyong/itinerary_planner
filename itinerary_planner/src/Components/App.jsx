import { Loader } from "@googlemaps/js-api-loader"
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useRef, useEffect, useState } from 'react'

function App() {
  const mapRef = useRef(null);
  const mapElement = useRef(null);
  const [query, setQuery] = useState("");

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
      fields: ['displayName', 'location'],
      region: 'jp',
    }

    const { places } = await Place.searchByText(request);
    if (places.length) {
      console.log(places)
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds()

      places.forEach((place) => {
        const markerView = new AdvancedMarkerElement({
          map: mapRef.current,
          position: place.location,
          title: place.displayName,
        });
        bounds.extend(place.location)
      })
      mapRef.current.fitBounds(bounds)
    }
  }

  return (
    <>
      <NavBar />
      <div className="app-container">
        <div id="list">
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}>
            <input type="text" id="place_search" value={query} onChange={(e) => setQuery(e.target.value)} />
          </form>

        </div>
        <div id="maps" ref={mapElement}>
        </div>
      </div>

      <button id="current-location-button" onClick={handleGoToLocation}>Go to my location</button>
      <button onClick={() => {
        console.log(query);
        handleSearch()
      }}>SEARCH</button>

      <Footer />
    </>
  )
}

export default App