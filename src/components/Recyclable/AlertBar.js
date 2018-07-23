import React, { PureComponent }     from 'react';
import PropTypes from 'prop-types';

export default class AlertBar extends PureComponent {
  render() {
	var classes = `clearfix alert alert-danger animated fadeInUp small-text`;
    return (
      <div className="clearfix">
        <div id="output" className={classes} >
          { this.props.children }
        </div>
      </div>
    )
  }
}
