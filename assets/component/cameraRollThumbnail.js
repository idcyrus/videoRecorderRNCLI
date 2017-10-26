import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  CameraRoll,
  Image,
  Linking
} from 'react-native';

export default class CameraRollThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
     uriLastVideo:''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.thumbnailStatusSignal!=nextProps.thumbnailStatusSignal){
      CameraRoll.getPhotos({
        first: 1,
        assetType: 'Videos'
      }).then(
        (data) =>{
          this.setState({
            uriLastVideo: data.edges[0].node.image.uri,
          })
        },
        (error) => {
          console.warn(error);
        }
      );
    }
  }


  render() {
      return (
        <View style={styles.container}>
          {this.state.uriLastVideo?
            <Image
              style={styles.thumbnail}
              source={{ uri: this.state.uriLastVideo }} />
            :null
          }
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  }
})
