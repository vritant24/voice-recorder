import React, { Component }   from 'react';
import { connect }            from 'react-redux';

import EmptyState             from 'components/EmptyState';
import RecordedItem           from 'components/RecordedItem';
import { styles }             from './styles.scss';

class RecordingsView extends Component {
  constructor(props) {
    super(props);
  }
  getRecordings = (list) => {
    const recordings = list.map((recordedItem, index) => {
      return (
        <li key={`recording-${index}`}>
          <RecordedItem item={recordedItem} />
        </li>
      );
    });
    return recordings;
  }
  displayRecordings = () => {
    const { list } = this.props.audio;

    if(list && list.length) {
      const audioItems = this.getRecordings(list);
      return(
        <ul>{audioItems}</ul>
      );
    } else {
      return(
        <EmptyState message="You Don't Have Any Recordings" />
      );
    }
  }
  render() {
    const recordings = this.displayRecordings();

    return (
      <div className={styles}>
        {recordings}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio
  };
}

export default connect(mapStateToProps)(RecordingsView);
