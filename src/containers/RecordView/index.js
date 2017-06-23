import React, { Component }   from 'react';
import ReactSimpleTimer       from 'react-simple-timer';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';

import Button                 from 'components/Button';
import MicrophoneIcon         from 'material-ui/svg-icons/av/mic';
import DeleteIcon             from 'material-ui/svg-icons/action/delete';
import DoneIcon               from 'material-ui/svg-icons/action/done';
import Microphone             from 'components/Microphone';

import { styles } from './styles.scss';
import * as audioActionCreators from 'core/actions/actions-audio';

class RecordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording     : false,
      saveRecording : false
    }
  }

  deleteRecording = () => {
    this.stopRecording();
  }
  saveRecording = () => {
    this.setState({
      saveRecording: true
    });
    this.stopRecording();
  }
  stopRecording = () => {
    this.setState({
      recording: false
    });
  }
  startRecording = () => {
    this.setState({
      recording: true
    })
  }
  onStop = (recording) => {
    const { history } = this.props;
    if(this.state.saveRecording) {
      history.push('/recordings');
      this.props.actions.audio.saveRecording(recording);
    }
  }
  render() {
    const { recording } = this.state;

    let buttons;
    if(recording) {
      buttons = (
        <div className="buttons">
        <Button
          className="secondary delete"
          iconOnly={true}
          onTouchTap={this.deleteRecording}
          icon={<DeleteIcon />} />
        <Button
          secondary={true}
          raised={true}
          floating={true}
          disabled={true}
          icon={<MicrophoneIcon />} />
        <Button
          className="secondary save"
          iconOnly={true}
          onTouchTap={this.saveRecording}
          icon={<DoneIcon />} />
        </div>
      );
    } else {
      buttons = (
        <Button
        className="btn"
        secondary={true}
        raised={true}
        floating={true}
        onTouchTap={this.startRecording}
        icon={<MicrophoneIcon />} />
      );
    }

    return (
      <div className={styles}>
        <Microphone record={recording} onStop={this.onStop} />
        <div id="controls">
          <span className={recording}>
            <ReactSimpleTimer play={recording} />
          </span>
          {buttons}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(RecordView));
