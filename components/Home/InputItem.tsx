"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
    AdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const API_KEY = "AIzaSyCmqC9vjHPUBgxOQ9i_TyDEArK1GLzQeOo"




const InputItem = ({ type }: { type: 'source' | 'destination' }) => {
console.log("🚀 ~ file: InputItem.tsx:24 ~ InputItem ~ type:", type)
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    interface MapHandlerProps {
        place: google.maps.places.PlaceResult | null;
        marker: google.maps.marker.AdvancedMarkerElement | null;
    }

    const MapHandler = ({ place, marker }: MapHandlerProps) => {
        const map = useMap();

        useEffect(() => {
            if (!map || !place || !marker) return;

            if (place.geometry?.viewport) {
                map.fitBounds(place.geometry?.viewport);
            }
            marker.position = place.geometry?.location;
        }, [map, place, marker]);

        return null;
    };

    interface PlaceAutocompleteProps {
        onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    }

    const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
        const [placeAutocomplete, setPlaceAutocomplete] =
            useState<google.maps.places.Autocomplete | null>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const places = useMapsLibrary('places');

        useEffect(() => {
            if (!places || !inputRef.current) return;

            const options = {
                fields: ['geometry', 'name', 'formatted_address']
            };

            setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
        }, [places]);

        useEffect(() => {
            if (!placeAutocomplete) return;

            placeAutocomplete.addListener('place_changed', () => {
                onPlaceSelect(placeAutocomplete.getPlace());
            });
        }, [onPlaceSelect, placeAutocomplete]);
        return (
            <div className="autocomplete-container">
                <input ref={inputRef} />
            </div>
        );
    };

    return (
        // <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
        <div>
            {/* <Image src={type === 'source' ? '/source_icon.png' : '/destination_icon.png'} alt='source' width={15} height={15} />
            <input type='text' placeholder={type === 'source' ? 'Pickup location' : 'Dropoff location'} className='bg-transparent w-full outline-none' /> */}
            <APIProvider
                apiKey={API_KEY}
                solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
                <Map
                    mapId={'bf51a910020fa25a'}
                    defaultZoom={3}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <AdvancedMarker ref={markerRef} position={null} />
                </Map>
                <MapControl position={ControlPosition.TOP}>
                    <div className="autocomplete-control">
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    </div>
                </MapControl>
                <MapHandler place={selectedPlace} marker={marker} />
            </APIProvider>
        </div>
    )
}

export default InputItem