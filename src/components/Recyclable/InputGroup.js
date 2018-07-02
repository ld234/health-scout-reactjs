import React, {Component} from 'react';

export default class InputGroup extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
  }

  /*handleChange = (event) => {
	console.log('text',text);
    const text = event.target.value;
    this.props.onChange(this.props.name, text);
  }*/

  render() {
    return (
      <div className="input-group">
        <input {...this.props} />
      </div>
    );
  }
}