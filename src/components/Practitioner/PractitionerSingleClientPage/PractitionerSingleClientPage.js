import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from './ClientGeneralInfo';
import { Modal, ModalBody, ModalHeader, ModalFooter, Tooltip } from 'mdbreact';
import '../../../../style/MyClientPage.css';
import { getClients } from '../../../actions/client.view.actions';
import escapeRegexCharacters from '../../Utilities/EscapeRegexCharacters';
import '../../../../style/PractitionerSingleClientPage.css';

class PractitionerSingleClientPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
		};
	}

	onChange = e => {
		this.setState({ searchInput: e.target.value });
	};

	renderClientListHead = (listTitle, count) => {
		return (
			<div className="practitioner-profile-head row justify-content-between">
				<div className="col col-md-8 profile-title">
					<h4>
						{listTitle} ({count})
					</h4>
				</div>
				<div className="horizontal-line">
					<hr />
				</div>
			</div>
		);
	};

	componentDidMount() {
		this.props.getClients();
	}
	/*

<li className="band-item" data-toggle="tooltip" title="Tooltip on left">
                        <a className="menu-card" >
                            <div className="thumb"></div>
                            <article>
                            </article>
                        </a>
                    </li>
                    */
	render() {
		return (
			<div id="practitioner-single-client-page" className="right">
				<ClientGeneralInfo />
				<ul className="band">
					<Tooltip
						id="tooltip-top"
						placement="top"
						componentClass="band-item"
						tag="li"
						tooltipContent="New Consultation"
					>
						<a className="menu-card">
							<div className="thumb" />
						</a>
					</Tooltip>
					<Tooltip
						id="tooltip-top"
						placement="top"
						componentClass="band-item"
						tag="li"
						tooltipContent="Medical History"
					>
						<a className="menu-card">
							<div className="thumb" />
						</a>
					</Tooltip>
					<Tooltip
						id="tooltip-top"
						placement="top"
						componentClass="band-item"
						tag="li"
						tooltipContent="My Past Consultations"
					>
						<a className="menu-card">
							<div className="thumb" />
						</a>
					</Tooltip>
					<Tooltip id="tooltip-top" placement="top" componentClass="band-item" tag="li" tooltipContent="Send Documents">
						<a className="menu-card">
							<div className="thumb" />
						</a>
					</Tooltip>
					<Tooltip
						id="tooltip-top"
						placement="top"
						componentClass="band-item"
						tag="li"
						tooltipContent="Received Documents"
					>
						<a className="menu-card">
							<div className="thumb" />
						</a>
					</Tooltip>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
		clientState: state.clients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getClients: () => dispatch(getClients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerSingleClientPage);
