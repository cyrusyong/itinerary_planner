import { Loader } from "@googlemaps/js-api-loader"
import NavBar from "./Navbar";
import { useRef, useEffect } from 'react'

function App() {
  const mapRef = useRef(null);
  const mapElement = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCGJ6bRHMUhb0oYGrxFimZ5CPNRZd1qSoU",
      version: "weekly"
    });

    loader.load().then(async () => {
      const { ColorScheme } = await google.maps.importLibrary("core")
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(mapElement.current, {
        center: { lat: 35.6764, lng: 139.65 },
        zoom: 6,
        colorScheme: ColorScheme.DARK,
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

  return (
    <>
      <NavBar />
      <div>
        This is the app component
      </div>
      <div id="maps" ref={mapElement}></div>
      <button id="current-location-button" onClick={handleGoToLocation}>Go to my location</button>
    </>
  )
}

export default App