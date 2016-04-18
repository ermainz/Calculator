import React from 'react';
import Paper from 'material-ui/lib/paper';

const displayStyle = {
  padding: 12,
  margin: 0,
  textAlign: 'right'
};

const Display = (props) => {
  let { displayValue } = props;
  if (!displayValue || displayValue.length === 0) {
    displayValue = (<i style={{color: '#d3d3d3'}}>Want to click something?</i>);
  }
  return (
    <Paper>
      <h1 style={displayStyle}>{ displayValue }</h1>
    </Paper>
  );
};

export default Display;
