import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';





export default class ScrollPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ height: 100 }}>
      <ScrollView horizontal={true}>
          <Category imgUrl='http://35.244.249.1/ironman.png' name='Iron man' />
          <Category imgUrl='http://35.244.249.1/hulk.png' name='Hulk' />

      </ScrollView>
      </View>
    );
  }
}

export class Category extends Component {
  constructor(props) {
    super(props);
  }


    onPress(event: GestureResponderEvent) {
    }


  render() {
    return (


      <View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity style={{flex: 1, height: undefined, width: undefined}} onPress={this.onPress} >
          <Image
            style={{flex: 1, height: undefined, width: undefined}}
            source={{ uri: this.props.imgUrl }}
            resizeMode="contain" />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text> { this.props.name } </Text>
        </View>
      </View>

    );
  }
}
