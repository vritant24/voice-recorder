import React, { Component }                     from 'react';
import { connect }                              from 'react-redux';
import { bindActionCreators }                   from 'redux';
import injectTapEventPlugin                     from 'react-tap-event-plugin';
import getMuiTheme                              from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                         from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Route, Switch, Redirect }  from 'react-router-dom';
import * as OfflinePluginRuntime                from 'offline-plugin/runtime';
injectTapEventPlugin();

// global styles for entire app
import './styles/app.scss';

import * as audioActionCreators                 from 'core/actions/actions-audio';

/* application containers */
import Header         from 'containers/Header';
import LeftNavBar     from 'containers/LeftNavBar';
import RecordView     from 'containers/RecordView';
import RecordingsView from 'containers/RecordingsView';

OfflinePluginRuntime.install();

export class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.audio.getAllRecordings();
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <HashRouter>
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <Route path="/record" component={RecordView} />
                  <Route path="/recordings" component={RecordingsView} />
                  <Redirect from="/" to="/record" />
                </Switch>
              </div>
              <LeftNavBar />
            </div>
          </HashRouter>
        </div>
      </MuiThemeProvider>
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
export default connect(null, mapDispatchToProps)(App);
