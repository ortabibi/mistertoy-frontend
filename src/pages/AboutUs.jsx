import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { useState } from "react"

export function AboutUs() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function onHandleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    const branches = [
        { city: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
        { city: 'Hadera', lat: 32.4340, lng: 34.9196 },
        { city: 'Bat Yam', lat: 32.0171, lng: 34.7454 },
    ]

    return (
        <div className='map'>
            <h1>Map</h1>

            <div className="branches">
                {branches.map(branch => (
                    <button
                        key={branch.city}
                        onClick={() => onHandleClick(branch)}
                    >
                        {branch.city}
                    </button>
                ))}
            </div>

            <div style={{ height: '70vh', width: '100%' }}>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                    <Map
                        style={{ height: '100%', width: '100%' }}
                        center={coords}
                        defaultZoom={zoom}
                        onCameraChanged={ev => setCoords(ev.detail.center)}
                        mapId="DEMO_MAP_ID"
                    >
                        {branches.map(branch => (
                            <AdvancedMarker
                                key={branch.city}
                                position={{ lat: branch.lat, lng: branch.lng }}
                                title={branch.city}
                            />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
}




