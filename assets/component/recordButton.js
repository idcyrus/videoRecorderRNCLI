import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import {PropTypes} from 'prop-types';

export default class RecordButton extends Component {
  static propTypes = {
    isRecording: PropTypes.bool,
    startRecording: PropTypes.func,
    stopRecording: PropTypes.func,
  }
  render (){
    return (
      <TouchableOpacity
        onPress={() => this.props.isRecording ? this.props.stopRecording():this.props.startRecording()}
        style={styles.recordButtonBorder}>
        {this.props.isRecording ? <View style={styles.recordButtonIsRecording}></View>:<View style={styles.recordButtonNotRecording}></View>}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  recordButtonBorder: {
    width:70,
    height:70,
    borderRadius: 70/2,
    borderWidth: 6,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonIsRecording: {
    width:28,
    height:28,
    borderRadius: 5,
    backgroundColor: '#f53333',
  },
  recordButtonNotRecording: {
    width:55,
    height:55,
    borderRadius: 55/2,
    backgroundColor: '#f53333',
  }
});
