import React, { Component }   from 'react';
import ReactSimpleTimer       from 'react-simple-timer';

import Button                 from 'components/Button';
import MicrophoneIcon         from 'material-ui/svg-icons/av/mic';
import DeleteIcon             from 'material-ui/svg-icons/action/delete';
import DoneIcon               from 'material-ui/svg-icons/action/done';

import { styles } from './styles.scss';

class RecordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false
    }
  }

  deleteRecording = () => {
    this.stopRecording();
  }
  saveRecording = () => {

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

export default RecordView;
