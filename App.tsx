import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import Callouts from './src/components/Callout';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

function makeMallMapper(useGoogleMaps: boolean) {
  if (useGoogleMaps) {
    return (mall: any) => [
      mall[0],
      [mall[1], mall[3]].filter(Boolean).join(' '),
    ];
  }
  return (mall: any) => mall;
}

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      Component: null,
      useGoogleMaps: ANDROID,
    };
  }

  renderMall([Component, title]: any) {
    return (
      <TouchableOpacity
        key={title}
        style={styles.button}
        onPress={() => this.setState({Component})}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.back}
        onPress={() => this.setState({Component: null})}>
        <Text style={styles.backButton}>&larr;</Text>
      </TouchableOpacity>
    );
  }

  renderGoogleSwitch() {
    return (
      <View>
        <Text>Use GoogleMaps?</Text>
        <Switch
          onValueChange={value => this.setState({useGoogleMaps: value})}
          style={styles.googleSwitch}
          value={this.state.useGoogleMaps}
        />
      </View>
    );
  }

  renderMalls(malls: any) {
    const {Component} = this.state;

    return (
      <View style={styles.container}>
        {Component && <Component provider={'google'} />}
        {Component && this.renderBackButton()}
        {!Component && (
          <ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}>
            {IOS && this.renderGoogleSwitch()}
            {malls.map((mall: any) => this.renderMall(mall))}
          </ScrollView>
        )}
      </View>
    );
  }

  render() {
    return this.renderMalls(
      [[Callouts, 'Villagio - Caxias do Sul', true]]
        .filter(
          mall => ANDROID || (IOS && (mall[2] || !this.state.useGoogleMaps)),
        )
        .map(makeMallMapper(IOS && this.state.useGoogleMaps)),
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {fontWeight: 'bold', fontSize: 30},
  googleSwitch: {marginBottom: 10},
});
