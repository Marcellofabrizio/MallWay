import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
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
        },
        {
          coordinate: {
            latitude: -29.175821124613073,
            longitude: -51.22035479118406,
          },
        },
        {
          coordinate: {
            latitude: -29.1771863838681,
            longitude: -51.21965500247566,
          },
        },
        {
          coordinate: {
            latitude: -29.176763517903705,
            longitude: -51.219020448335165,
          },
        },
      ],
    };
  }

  show() {
    this.marker1.showCallout();
  }

  hide() {
    this.marker1.hideCallout();
  }

  render() {
    const {region, markers} = this.state;
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
          <Marker
            ref={ref => {
              this.marker1 = ref;
            }}
            coordinate={markers[0].coordinate}
            title="This is a native view"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
          />
          <Marker coordinate={markers[1].coordinate}>
            <Callout style={styles.plainView}>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={markers[2].coordinate}
            calloutOffset={{x: -8, y: 28}}
            calloutAnchor={{x: 0.5, y: 0.4}}
            ref={ref => {
              this.marker2 = ref;
            }}>
            <Callout
              alphaHitTest
              tooltip
              onPress={_ => {
                Alert.alert('callout pressed');
              }}
              style={styles.customView}>
              <CustomCallout>
                <Text>{`This is a custom callout bubble view ${this.state.cnt}`}</Text>
              </CustomCallout>
            </Callout>
          </Marker>
          <Marker
            ref={ref => {
              this.marker4 = ref;
            }}
            coordinate={markers[3].coordinate}
            title="You can also open this callout"
            description="by pressing on transparent area of custom callout"
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Tap on markers to see different Callout</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.show()}
            style={[styles.bubble, styles.button]}>
            <Text>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.hide()}
            style={[styles.bubble, styles.button]}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
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
