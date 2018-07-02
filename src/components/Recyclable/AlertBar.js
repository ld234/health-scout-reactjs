import React, { PureComponent }     from 'react';
import PropTypes                from 'prop-types';

export default class AlertBar extends PureComponent {
  render() {
	var classes = `small-text alert alert-${this.props.componentType}`;
    return (
      <div className="clearfix">
        <div className={classes} >
          { this.props.children }
        </div>
      </div>
    )
  }
}
