import React, {
  Component
} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'
import * as firebase from 'firebase'
import SignupScreen from './SignupScreen'
import LoginScreen from './LoginScreen'

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => { 
      this.props.navigation.navigate(user ? 'Main' : 'SignupScreen')
    })
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Loading</Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
