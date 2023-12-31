import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import CustomCallout from './CustomCallout';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -29.17721;
const LONGITUDE = -51.21906;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Callouts extends React.Component<any, any> {
  marker1: any;
  marker2: any;
  marker4: any;

  constructor(props: any) {
    super(props);

    this.state = {
      cnt: 0,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: -29.176628890815476,
            longitude: -51.22042990972908,
          },
          store: 'Renner',
        },
        {
          coordinate: {
            latitude: -29.175821124613073,
            longitude: -51.22035479118406,
          },
          store: 'McDonalds',
        },
        {
          coordinate: {
            latitude: -29.1771863838681,
            longitude: -51.21965500247566,
          },
          store: 'GNC Cinemas',
        },
        {
          coordinate: {
            latitude: -29.176763517903705,
            longitude: -51.219020448335165,
          },
          store: 'Decathlon',
        },
      ],
      markersRef: [],
      selectedMarker: undefined,
    };
  }

  getMarkers() {
    let markers = [];

    for (let i = 0; i < this.state.markers.length; i++) {
      const coordinate = this.state.markers[i].coordinate;
      const storeName = this.state.markers[i].store;
      markers.push(
        <Marker
          coordinate={coordinate}
          calloutOffset={{x: -8, y: 28}}
          calloutAnchor={{x: 1, y: 0.4}}
          ref={ref => {
            this.state.markersRef.push(ref);
          }}
          onPress={_ => {
            this.setState({
              selectedMarker: i,
            });
          }}
          key={i}>
          <Callout alphaHitTest tooltip style={styles.customView}>
            <CustomCallout>
              <Text>{`${storeName}`}</Text>
              <Text>{'Movimento: Pouco movimentado'}</Text>
              <Text>{'Abre às: 8:30'}</Text>
              <Text>{'Fecha às: 21:30'}</Text>
            </CustomCallout>
          </Callout>
        </Marker>,
      );
    }

    return markers;
  }

  getTakeMeThereButton() {
    if (this.state.selectedMarker >= 0) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() =>
              this.takeThere(
                this.state.markers[this.state.selectedMarker].coordinate,
              )
            }>
            <Text style={styles.buttonText}>
              Clique para ver as rotas disponíveis
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  show() {
    if (this.state.selectedMarker >= 0) {
      this.state.markersRef[this.state.selectedMarker].showCallout();
    }
  }

  hide() {
    if (this.state.selectedMarker >= 0) {
      this.state.markersRef[this.state.selectedMarker].hideCallout();
    }
  }

  takeThere(coordinates: any) {
    console.log(
      `google.navigation:q=${coordinates.latitude},${coordinates.longitude}`,
    );
    Linking.openURL(
      `google.navigation:q=${coordinates.latitude},${coordinates.longitude}`,
    );
  }

  render() {
    const {region} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={region}
          camera={{
            center: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
            },
            heading: 0,
            pitch: 0,
            zoom: 17,
          }}
          zoomTapEnabled={false}>
          {this.getMarkers()}
        </MapView>
        {this.getTakeMeThereButton()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.show()}
            style={[styles.bubble, styles.button]}>
            <Text style={styles.buttonText}>Mostrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.hide()}
            style={[styles.bubble, styles.button]}>
            <Text style={styles.buttonText}>Esconder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 170,
    height: 180,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#f85f6a',
  },
  buttonText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

const mapStyle = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
export default Callouts;
