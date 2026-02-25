"use client";

import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

interface MapMarker {
  lngLat: [number, number];
  color: string;
  label?: string;
}

interface MapRoute {
  coordinates: [number, number][];
  color: string;
  width?: number;
}

interface MapTilerMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  route?: MapRoute;
  className?: string;
  style?: maptilersdk.ReferenceMapStyle | string;
}

const MapTilerMapInner: React.FC<MapTilerMapProps> = ({
  center,
  zoom,
  markers = [],
  route,
  className = '',
  style,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maptilersdk.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    maptilersdk.config.apiKey = '8U3A2sHPlQxFwoK9RBgP';

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: style || maptilersdk.MapStyle.STREETS,
      center: center,
      zoom: zoom,
      interactive: false,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add markers
      markers.forEach((marker) => {
        const el = document.createElement('div');
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = marker.color;
        el.style.border = '3px solid white';
        el.style.boxShadow = `0 2px 8px ${marker.color}80`;

        new maptilersdk.Marker({ element: el })
          .setLngLat(marker.lngLat)
          .addTo(map);
      });

      // Add route line
      if (route) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route.coordinates,
            },
          },
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': route.color,
            'line-width': route.width || 3,
            'line-opacity': 0.8,
          },
        });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MapTilerMapInner;
