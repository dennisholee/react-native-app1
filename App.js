import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  Button,
  FlatList,
  Header,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {
  createBottomTabNavigator,
  SwitchNavigator,
} from 'react-navigation';
import {
  Camera,
  MapView,
  Permissions
} from 'expo';

import * as firebase from 'firebase';
import { compose, withHandlers, withProps, withState, withStateHandlers } from "recompose";
import CameraPanel from "./components/CameraPanel";
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import StatusBar from "./components/StatusBar";
import SearchBar from "./components/SearchBar";
import AtmPanel from './components/AtmPanel';
import withFormData from './components/withFormData';
import MyForm from './components/MyForm';
import {
  ScrollPanel
} from './components/ScrollPanel';

import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';

import { createStore } from 'redux';
import { Constants } from 'expo';
import { Provider, connect } from 'react-redux';

// Initialize Firebase
firebase.initializeApp(Constants.manifest.extra.firebase);

const INITIAL_STATE = {
  geolocation: 0
}

const reducer = (state, action) => {
  console.log("  param:  " + JSON.stringify(action))
  switch(action.type) {
    case "map":
      return { geolocation: action.geolocation }
    default:
      return state
  }
}

const store = createStore( reducer, {} )

const mapStateToProps = (state) => {
  return { ...state }
}

const Nav = createBottomTabNavigator ({
    Home : {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon : ({ tintColor })=>(
           <Ionicons name="ios-search" size={32} color={tintColor} />
        )
      }
    },
    ATM : {
      screen: AtmPanel,
      navigationOptions: {
        tabBarLabel: 'ATM',
        tabBarIcon: ({ tintColor })=> (
          <MaterialIcons name="local-atm" size={32} color={tintColor} />
        )
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
          tabBarLabel: 'MAP',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-mail" size={32} color={tintColor} />
          )
      }
    },
    Camera: {
      screen: CameraPanel,
      navigationOptions: {
          tabBarLabel: 'CAMERA',
          tabBarIcon: ({ tintColor }) => (
            <Feather name="camera" size={32} color={tintColor} />
          )
      }
    },
    Alert: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'ALERT',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-alert" size={32} color={tintColor} />
        )
      }
    },
});



class App extends Component {
  render() {
    return(
        <Nav />
    );
  }
}

export default class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

/*

// create our app's navigation stack
const App = SwitchNavigator(
  {
    LoadingScreen,
    HomeScreen,
    SignupScreen,
    LoginScreen
    //SignUp,
    //Login,
    //Main
  },
  {
    initialRouteName: 'LoadingScreen'
  }
)

export default App;
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => MyApp);
