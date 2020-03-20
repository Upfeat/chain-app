import * as React from 'react';
import { Image, StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { Layouts } from "../styles"
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [locationState, setLocationState] = React.useState(null);

  if (Platform.OS === 'android' && !Constants.isDevice) {
    Alert.alert('Error', 'Location not working in Android emulator');
  } else {
    _getLocationAsync();
  }

  async function _getLocationAsync() {
    try {
      let resp = await Permissions.askAsync(Permissions.LOCATION);
      console.log(resp)
    if (resp.status !== 'granted') {
      Alert.alert('Error', 'Location service need to be enabled');
    }
    } catch(e) {
      console.log(e)
    }
    

    let location = await Location.getCurrentPositionAsync({});
    setLocationState(location);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_getLocationAsync}>
        <Image
          source={require('../assets/images/upfeat.png')}
        />
      </TouchableOpacity>
      <Text>Your location is: {JSON.stringify(locationState)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layouts.flex()
  },
});
