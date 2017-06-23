import React, { Component }   from 'react';
import { ReactMic }           from 'react-mic';

import MicrophoneIcon         from 'material-ui/svg-icons/av/mic';
import IconButton             from 'material-ui/IconButton';

import { styles } from './styles.scss';

export default class Microphone extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { record, onStop } = this.props;

    return (
      <div className={styles}>
        <div className="microphone-icon"/>
        <ReactMic
          className="recording-line"
          record={record}
          onStop={onStop}
          strokeColor={"#0096ef"}
          backgroundColor={"#414141"} />
      </div>
    );
  }
}
