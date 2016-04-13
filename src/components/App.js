import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

export default class App extends Component {
  render() {
    const buttonStyle = {
      margin: 12,
    };
    const displayStyle = {
      padding: 12,
      margin: 0,
      textAlign: 'right'
    };
    const paperStyle = {
      width: 488,
      margin: 'auto',
      marginTop: 60,
      padding: 20
    };
    return (
      <Paper style={paperStyle}>
        <h1 style={displayStyle}>Display</h1>
        <div>
          <RaisedButton label="AC" primary={true} style={buttonStyle} />
          <RaisedButton label="/" secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="7" style={buttonStyle} />
          <RaisedButton label="8" style={buttonStyle} />
          <RaisedButton label="9" style={buttonStyle} />
          <RaisedButton label="X" secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="4" style={buttonStyle} />
          <RaisedButton label="5" style={buttonStyle} />
          <RaisedButton label="6" style={buttonStyle} />
          <RaisedButton label="-" secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="1" style={buttonStyle} />
          <RaisedButton label="2" style={buttonStyle} />
          <RaisedButton label="3" style={buttonStyle} />
          <RaisedButton label="+" secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="0" style={buttonStyle} />
          <RaisedButton label="=" primary={true} style={buttonStyle} />
        </div>
      </Paper>
    );
  }
}
