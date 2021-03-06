/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: List of specialties
 * Created: 13 Aug 2018
 * Last modified: 28 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { connect } from 'react-redux';
import { deleteSpecialty, resetDeleteSuccess } from '../../actions/specialty.actions';
import '../../../style/SpecialtyList.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class PractitionerSpecialtyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justDelete: null,
			justClicked: null,
		};
	}

	toggle2 = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	renderListItems = () => {
		const specialties = this.props.specialtyState.specialties ? this.props.specialtyState.specialties : [];
		return specialties.map(({ specialty }, idx) => {
			let classes = '';
			if (this.state.justDelete === idx) {
				classes = 'animated fadeOut';
			}
			return (
				<li
					key={`specialty${idx}`}
					list-length={this.props.specialtyState.specialties.length}
					className={`specialty-item`}
				>
					<span className="specialty-number">
						<img height="25px" src="../../../../style/img/icons8-stomach-50.png" />
					</span>
					<span className="specialty-name">{specialty}</span>
					<span className="specialty-delete">
						<i
							onClick={() => {
								this.setState({ justClicked: idx });
								this.toggle2();
							}}
							className="fas fa-trash-alt"
						/>
					</span>
				</li>
			);
		});
	};

	render() {
		if (this.props.specialtyState.specialties && this.props.specialtyState.specialties.length > 0)
			return (
				<div className="specialty-wrapper">
					<ul className="rolldown-list specialty" id="myList">
						<ReactCSSTransitionGroup
							transitionName="specialtyFade"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
						>
							{this.renderListItems()}
						</ReactCSSTransitionGroup>
					</ul>
					<Modal id="confirm-accept-modal" isOpen={this.state.modal} toggle={this.toggle2}>
						<ModalHeader toggle={this.toggle2}>Confirmation</ModalHeader>
						<ModalBody>
							Are you sure you want to delete specialty&nbsp;
							{this.state.justClicked !== null
								? this.props.specialtyState.specialties[this.state.justClicked].specialty
								: this.state.justClicked}
							?
						</ModalBody>
						<ModalFooter>
							<div className="buttons">
								<a onClick={this.toggle2}>Cancel</a>
								<a
									className="confirm-accept"
									onClick={() => {
										this.setState({ justDelete: this.state.justClicked, justClicked: null }, () => {
											setTimeout(() => this.setState({ justDelete: null }), 1000);
										});
										this.props.deleteSpecialty(
											this.props.specialtyState.specialties[this.state.justClicked],
											this.state.justClicked
										);
										this.toggle2();
									}}
								>
									Accept
								</a>
							</div>
						</ModalFooter>
					</Modal>
				</div>
			);
		return (
			<div className="small-text">
				<p className="text-center">
					<i>Start adding your specialty(ies) to increase credibility and searchability.</i>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		specialtyState: state.specialties,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteSpecialty: (specialty, pos) => dispatch(deleteSpecialty(specialty, pos)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerSpecialtyList);
