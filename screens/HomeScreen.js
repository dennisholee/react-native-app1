import React, {
  Component
} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Constants } from 'expo';

import MyForm from '../components/MyForm';
import ScrollPanel from '../components/ScrollPanel';
import SearchBar from '../components/SearchBar';
import StatusBar from '../components/StatusBar';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch(Constants.manifest.extra.myapi.api.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={ styles.container }>
         <Text>Loading ... </Text>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <SafeAreaView style={ styles.container }>
        <View>
          <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />

          <View style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
            <SearchBar />
            <ScrollPanel />

          </View>

          <MyForm />
          <Text>{this.state.dataSource.message}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
});
