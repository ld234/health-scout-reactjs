import React, { Component } from 'react';
import ReactStars from 'react-stars';

class PracStarRating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: parseFloat(this.props.rating),
			size: parseInt(this.props.size),
		};
	}

	render() {
		console.log('this.state.rating', this.state.rating);
		return (
			<div className="star-rating">
				<ReactStars
					count={5}
					size={this.state.size}
					value={this.state.rating}
					color2={'#ffd700'}
					edit={false}
					half={true}
				/>
			</div>
		);
	}
}

export default PracStarRating;
