import React, { Component }   from 'react';

import { styles } from './styles.scss';

class RecordView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        Record View
      </div>
    );
  }
}

export default RecordView;