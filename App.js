import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  FlatList,
  Header,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {
  createBottomTabNavigator
} from 'react-navigation';
import { Camera, Permissions } from 'expo';
import CameraPanel from "./components/CameraPanel";
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import StatusBar from "./components/StatusBar";
import SearchBar from "./components/SearchBar";

class AtmComponent extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount() {

    return fetch('https://api.hsbc.com/open-banking/v2.2/branches')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
     return(
       <View style={{flex: 1, padding: 20}}>
         <ActivityIndicator/>
       </View>
     )
   }

   return(
     <View style={{flex: 1, paddingTop:20}}>

       <FlatList
         data={this.state.dataSource[0].Brand[0].Branch}
         renderItem={({item}) => <Text>{item.Name}</Text>}
         keyExtractor={item => item.Identification } />
     </View>
   );
  }
}

class HomeScreen extends Component {
    render() {
      return(
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#2EBD6B" barStyle="light-content" />

            <View style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
              <SearchBar />
            </View>
          </View>
        </SafeAreaView>
      );
    }
}

export default createBottomTabNavigator ({
    Home : {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon : ({ tintColor })=>(
           <Ionicons name="ios-search" size={32} color={tintColor} />
        )
      }
    },
    ATM: {
      screen: AtmComponent,
      navigationOptions: {
        tabBarLabel: 'ATM',
        tabBarIcon: ({ tintColor })=> (
          <MaterialIcons name="local-atm" size={32} color={tintColor} />
        )
      }
    },
    Messaging: {
      screen: HomeScreen,
      navigationOptions: {
          tabBarLabel: 'MESSAGING',
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


AppRegistry.registerComponent('AwesomeProject', () => MyApp);
