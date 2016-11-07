import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-root-toast';

class App extends Component {
  componentDidMount() {
    OneSignal.configure({
      onNotificationOpened: this.handleNotification,
    });
  }

  handleNotification(message, data, isActive) {
    if (isActive) {
      Toast.show(message);
    } else {
      // NOTE: This is the point at which you would tap into your routing system
      Alert.alert(message, JSON.stringify({ name: data.room }));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the OneSignal Example!
        </Text>
        <Text style={styles.instructions}>
          Using {Platform.OS}? Cool.
        </Text>
        {Platform.OS === 'ios' ?
          <TouchableOpacity
            onPress={() => OneSignal.registerForPushNotifications()}
            style={{ padding: 20, backgroundColor: '#3B5998' }}
          >
            <Text style={{ color: '#fff' }}>Request Push Notification Permission</Text>
          </TouchableOpacity>
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
