import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { Constants } from 'expo';


export default class AtmPanel extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount() {
    return fetch(Constants.manifest.extra.hsbc.branch.url)
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

  renderRow = ( item ) => {
    return (
      <ConnectRowItem item={item} navigation={this.props.navigation} dispatch={this.props.dispatch} />
    )
  }

  render() {
    if(this.state.isLoading){
     return(
       <View style={ styles.container }>
        <Text>Loading ... </Text>
         <ActivityIndicator/>
       </View>
     )
   }

   return(
     <View style={ styles.container }>
       <FlatList
        data={this.state.dataSource[0].Brand[0].Branch}
          renderItem={({item}) => (
            this.renderRow(item)
          )}
         keyExtractor={item => item.Identification } />
     </View>
   );
  }
}

class RowItem extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
      this.props.dispatch({
        type: 'map',
        geolocation: this.props.item.PostalAddress.GeoLocation.GeographicCoordinates
      })

      this.props.navigation.navigate('Map')
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.branchSummary} >
          <View>
            <Text style={{ fontSize: 18 }}>{this.props.item.Name}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View>
              <Text>
                {this.props.item.PostalAddress.BuildingNumber}
                {' '}
                {this.props.item.PostalAddress.StreetName},
                {' '}
                {this.props.item.PostalAddress.TownName}
              </Text>
            </View>
            <View>
              <Text>
              <Text>
                {this.props.item.PostalAddress.GeoLocation.GeographicCoordinates.Latitude}
                {' '}
                {this.props.item.PostalAddress.GeoLocation.GeographicCoordinates.Longitude}
              </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const ConnectRowItem = connect() ( RowItem )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  branchSummary: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flex: 1,
    padding: 2,
  }
});
