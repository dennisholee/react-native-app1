import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchBar extends Component {

  render() {
    return(
      <View style={ styles.searchBar }>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Ionicons name="ios-person" size={32} style={{ marginRight: 10 }} />
          <TextInput style={ styles.searchText }/>
          <Ionicons name="md-apps" size={32} style={{ marginLeft : 10 }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar : {
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    justifyContent: 'flex-start',
  },

  searchText : {
     borderWidth: 1,
     borderColor: '#CCCCCC',
     flex: 1
  }
});
