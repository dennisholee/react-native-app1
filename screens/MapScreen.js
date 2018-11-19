import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux'
import {
  MapView
} from 'expo';

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
      console.log(this.props.geo)

  }

  render() {
    return (

        <MapView
          provider="google"
          style={{
            flex: 1
          }}
          initialRegion={{
            latitude: parseFloat(this.props.geo.Latitude),
            longitude: parseFloat(this.props.geo.Longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }} >
          <MapView.Marker
            coordinate={{ latitude: parseFloat(this.props.geo.Latitude), longitude: parseFloat(this.props.geo.Longitude) }}
            title="HSBC"
            description="Some description"
          />
        </MapView>
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

const mapStateToProps = state => {
  console.log("mapStateToProps: " + JSON.stringify(state))
  return { geo: state.geolocation }
}

export default connect( mapStateToProps ) ( MapScreen )
