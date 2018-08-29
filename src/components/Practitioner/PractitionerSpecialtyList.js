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
		if (this.props.specialtyState.isDeleteSpecialtyPending)
			console.log('bool', this.props.specialtyState.isDeleteSpecialtyPending);
		const specialties = this.props.specialtyState.specialties ? this.props.specialtyState.specialties : [];
		return specialties.map(({ specialty }, idx) => {
			let classes = '';
			if (this.state.justDelete === idx) {
				classes = 'animated fadeOut';
				console.log('new classes', this.state.justDelete);
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
	/*
li key={idx} className={classes} >{specialty}
    <span className="name"></span>
    <div className="specialty-delete" 
        onClick={() => {
            this.setState({justDelete: idx}, () => {
                setTimeout(() => this.setState({justDelete:null}),1000)
                console.log(this.state)
            })
            setTimeout(() => this.props.deleteSpecialty(this.props.specialtyState.specialties[idx],idx),1000)
        }}
    >
        x
    </div>
</li>
*/
	render() {
		console.log('clicked this', this.state.justClicked);
		return (
			<div className="specialty-wrapper">
				<ul className="rolldown-list" id="myList">
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
										console.log(this.state);
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
