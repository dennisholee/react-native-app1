import React, { Component } from 'react';
import {
    TextInput,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchBar extends Component {

  render() {
    return(
      <View style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Ionicons name="ios-person" size={32} style={{ marginRight: 10 }} />
          <TextInput style={{ borderWidth: 1, borderColor: '#CCCCCC', flex: 1 }}/>
          <Ionicons name="md-apps" size={32} style={{ marginLeft : 10 }} />
        </View>
      </View>
    )
  }
}
