import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Alert,
  Image,
  CameraRoll,
  Linking
} from 'react-native';
import RecordButton from './assets/component/recordButton';
import Camera from 'react-native-camera';
// import CameraRollThumbnail from './assets/component/cameraRollThumbnail'; //The component was applied to fetch the uri of last video in the iOS camera roll

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      dotText:'',
      uriLastVideo:'',
      // thumbnailStatusSignal:false,
    };
  }

  componentWillMount(){
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
  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => {
            console.log(data);
            this.setState({uriLastVideo:data.path});
          }).catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
      this.startBlinking();
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
      });
      this.stopBlinking();
    }
  }

  startBlinking=() => {
    this.setState({ dotText: '●'});
    this.timer=setInterval(
      () => this.setState({ dotText: this.state.dotText==='' ? '●':''}),
      1000,
    );
  }

  stopBlinking=() => {
    clearInterval(this.timer);
    this.setState({ dotText: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Hide status bar */}
        <StatusBar hidden={true} />

        {/* Access local camera with config */}
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.video}
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
          captureQuality={Camera.constants.CaptureQuality["720p"]}
          captureAudio>
          <Text style={styles.blinkDot}>{this.state.dotText}</Text>{/* A dot displayed as feedback while recording */}
        </Camera>

        {/* Bottom bar */}
        <View style={styles.button}>
          <RecordButton isRecording={this.state.isRecording} startRecording={this.startRecording} stopRecording={this.stopRecording} />

          {/* Showing the thumbnail of last video in the camera roll. Its update is also a feedback of recording finished */}
          <TouchableOpacity
            style={styles.cameraRoll}
            onPress={()=>Linking.openURL('photos-redirect:').catch(err => console.error('An error occurred', err))}>
            {this.state.uriLastVideo?
              <Image
                style={styles.thumbnail}
                source={{ uri: this.state.uriLastVideo }} />
              :null
            }
            {/* <CameraRollThumbnail thumbnailStatusSignal={this.state.thumbnailStatusSignal}/> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  preview: {
    flex: 26,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  blinkDot: {
    position: 'absolute',
    bottom: 10,
    color: '#f53333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    flex:4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black',
  },
  cameraRoll: {
    position:'absolute',
    left:20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  }
});
