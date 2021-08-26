import { RetryIcon } from 'assets/images';
import Button from 'components/Button';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useRef, useState } from 'react';
import Marker from './Marker';
import useStyles from './styles';

interface IProps {
  zoom: number;
  mapStyles: object;
  latLng: LatitudeLongitude;
  markers?: Array<LatitudeLongitude>;
  drawingManager?: boolean | undefined;
}

interface LatitudeLongitude {
  lat: number;
  lng: number;
  highlight?: boolean;
}

const Map = ({ zoom, mapStyles, latLng, markers, drawingManager }: IProps) => {
  const classes = useStyles();
  const [activePolygon, _setActivePolygon] = useState<any>(null);
  const activePolygonStateRef = useRef<any>(activePolygon);
  const [mapMarkers, setMapMarkers] = useState<LatitudeLongitude | any>([]);
  const [showReset, setShowReset] = useState<boolean>(false);
  const bootstrapUrlKeys = {
    key: process.env.GOOGLE_API_KEY || '',
    libraries: ['drawing'].join(','),
  };
  const resetMarkers = markers;

  useEffect(() => {
    const pseudoMarkers = markers
      ? markers.map(marker => {
          return { ...marker, highlight: false };
        })
      : [];
    setMapMarkers(pseudoMarkers);
  }, [markers]);

  const setActivePolygon = (data: any) => {
    activePolygonStateRef.current = data;
    _setActivePolygon(data);
  };

  const resetPolygon = (polygon: any) => {
    if (polygon) {
      polygon.setMap(null);
      setActivePolygon(null);
      setMapMarkers(resetMarkers);
    }
    setShowReset(false);
  };

  const handlePolygonComplete = (map: any, google: any, polygon: any) => {
    resetPolygon(activePolygonStateRef.current);
    const pseudo = mapMarkers.map((marker: LatitudeLongitude) => {
      return {
        ...marker,
        highlight: google.geometry.poly.containsLocation(new google.LatLng(marker.lat, marker.lng), polygon),
      };
    });
    setMapMarkers(pseudo);
    setShowReset(true);
    setActivePolygon(polygon);
  };

  const handleGoogleMapApi = (map: any, google: any) => {
    const drawingManager = new google.drawing.DrawingManager({
      drawingMode: google.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.ControlPosition.TOP_CENTER,
        drawingModes: [google.drawing.OverlayType.POLYGON],
      },
    });

    drawingManager.setMap(map);
    google.event.addListener(drawingManager, 'polygoncomplete', function (polygon: any) {
      handlePolygonComplete(map, google, polygon);
    });
  };

  return (
    <div style={mapStyles}>
      {showReset && (
        <Button
          btnPrimaryLight
          size="small"
          className={classes.mapButtons}
          startIcon={<RetryIcon />}
          onClick={() => resetPolygon(activePolygon)}
        >
          Reset
        </Button>
      )}
      <GoogleMapReact
        bootstrapURLKeys={bootstrapUrlKeys}
        defaultCenter={latLng}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals={drawingManager}
        onGoogleApiLoaded={drawingManager ? ({ map, maps }) => handleGoogleMapApi(map, maps) : undefined}
      >
        {mapMarkers &&
          mapMarkers.map((marker: LatitudeLongitude) => (
            <Marker key={Date.now() * Math.random()} lat={marker.lat} lng={marker.lng} highlight={marker.highlight} />
          ))}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
