import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

const API_KEY = process.env.REACT_APP_MAP_KEY;
Geocode.setApiKey(API_KEY);
Geocode.enableDebug();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPosition: { lat: '', lng: '' }
    };
  }

  /**
   * Component should only update ( meaning re-render ),
   * when the user selects the address, or drags the pin
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate() {
    const { mapPosition } = this.state;
    const { center } = this.props;
    if (mapPosition.lat === center.lat) {
      return false;
    }
    this.setState({
      mapPosition: {
        lat: center.lat,
        lng: center.lng
      }
    });
    return true;
  }

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    console.log('place: ', place);
    const { getMapLocation } = this.props;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    getMapLocation({ lat, lng });
  };

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    const { getMapLocation } = this.props;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    getMapLocation({ lat, lng });
  };

  render() {
    const { google, zoom, height, display, center } = this.props;
    console.log('this.props: ', this.props);

    const AsyncMap = withScriptjs(
      withGoogleMap((_props) => (
        <GoogleMap
          google={google}
          defaultZoom={zoom}
          defaultCenter={{ lat: center.lat, lng: center.lng }}
        >
          {display && (
            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px'
              }}
              types={['(regions)']}
              onPlaceSelected={this.onPlaceSelected}
            />
          )}
          <Marker
            google={google}
            draggable
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: center.lat, lng: center.lng }}
          />
          <Marker />
        </GoogleMap>
      ))
    );

    let map;
    if (center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}?v3.exp&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height }} />;
    }
    return map;
  }
}

export default Map;
