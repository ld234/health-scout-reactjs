import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'mdbreact';
import '../../../style/Timeline.css';

class Timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hoveredItem: null,
			modal: false,
			positionsChanged: [],
		};
	}

	handleHover = i => {
		this.setState({ hoveredItem: i });
	};

	handleMouseOut = e => {
		this.setState({ hoveredItem: null });
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	componentWillUpdate(nextProps, nextState) {
		let arr = [];
		let changed = false;
		if (Array.isArray(this.props.qualificationState.qualifications)) {
			this.props.qualificationState.qualifications.forEach((q, idx) => {
				if (
					nextProps.qualificationState.qualifications[idx] &&
					(q.degree !== nextProps.qualificationState.qualifications[idx].degree ||
						q.institution !== nextProps.qualificationState.qualifications[idx].institution ||
						q.graduateYear !== nextProps.qualificationState.qualifications[idx].graduateYear ||
						q.description !== nextProps.qualificationState.qualifications[idx].description)
				) {
					arr.push(idx);
					changed = true;
				}
			});
		}
		if (changed) this.setState({ positionsChanged: arr });
		else if (this.state.positionsChanged.length > 0) this.setState({ positionsChanged: [] });
	}

	renderListItems = () => {
		let direction = 'r';
		let bounce = '';
		let fadeOut = '';
		let now = 0;
		return this.props.data.map((item, idx) => {
			direction = idx % 2 === 0 ? 'r' : 'l';
			if (this.props.qualificationState.isEditQualificationSuccess && idx === this.state.positionsChanged[now]) {
				now++;
				bounce = 'animated bounceIn';
			} else {
				bounce = '';
			}
			if (idx % 2 === 0) {
				fadeOut = 'animated fadeOut';
			} else {
				fadeOut = '';
			}

			return (
				<li
					onMouseLeave={this.handleMouseOut}
					onMouseOver={() => this.handleHover(idx)}
					key={idx}
					className={`event ${bounce}`}
					data-date={item[this.props.timeWrapper]}
				>
					<div className="timeline-text-wrapper">
						<h3>{item[this.props.flag]}</h3>
						{this.state.hoveredItem !== null && this.state.hoveredItem === idx ? (
							<div className={`edit-icon`}>
								<span onClick={() => this.props.toggle(this.state.hoveredItem)}>
									<i className="far fa-edit" />
								</span>
							</div>
						) : null}
						<div className="timeline-subtext">
							<i>{item[this.props.subtext]}</i>
						</div>
						<p>{item[this.props.desc]}</p>
					</div>
				</li>
			);

			// return (
			// 	<li key={idx}>
			// 		<div onMouseLeave={this.handleMouseOut} onMouseOver={() => this.handleHover(idx)} className={`direction-${direction} ${bounce}`}>
			// 			<div className="flag-wrapper">
			// 				<span className="flag">{item[this.props.flag]}</span>
			// 				<span className="time-wrapper"><span className="time">{item[this.props.timeWrapper]}</span></span>
			// 			</div>
			// 			{this.state.hoveredItem !== null && this.state.hoveredItem === idx?
			// 				<div className={`edit-icon-${direction}`}><span onClick={() => this.props.toggle(this.state.hoveredItem)}>
			// 					<i className="far fa-edit"></i></span>
			// 				</div> : null
			// 			}
			// 			<div className="timeline-subtext"><i>{item[this.props.subtext]}</i></div>
			// 			<div className="desc">{item[this.props.desc]}</div>
			// 		</div>
			// 	</li>
			// )
		});
	};

	render() {
		if (
			typeof this.props.data != 'undefined' &&
			this.props.data != null &&
			this.props.data.length != null &&
			this.props.data.length > 0
		) {
			// return (
			// 	<ul className="timeline">
			// 		{this.renderListItems()}
			// 	</ul>
			// );
			return <ul className="timeline">{this.renderListItems()}</ul>;
		}

		return (
			<div className="small-text">
				<p className="text-center">
					<i>
						Start adding your {this.props.for}
						(s) to increase credibility and searchability.
					</i>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		qualificationState: state.qualifications,
	};
};

export default connect(mapStateToProps)(Timeline);
