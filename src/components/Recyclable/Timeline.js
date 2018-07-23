import React from 'react';
import { connect } from 'react-redux';
import { getQualifications, addQualification } from '../../actions/qualification.actions';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';

class Timeline extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			hoveredItem:null,
			modal: false,
		};
	}

	handleHover = (i) => {
		this.setState({hoveredItem: i});
	}

	handleMouseOut = (e) => {
		console.log('mouse out item',this.state.hoveredItem);
		this.setState({hoveredItem: null});
	}

	toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

	renderEditModal(){
		return (
			<Modal className="editing-modal" isOpen={this.state.modal} toggle={this.props.toggle} centered>
				<ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
				{React.cloneElement(this.props.children,{toggle: this.toggle})}
			</Modal>
		)
	}
	
	renderListItems = () =>{
		let direction = "r";
		return this.props.data.map((item, idx) => {
			direction = idx % 2 === 0 ? "r" : "l";
			return (
				<li key={idx}>
					<div onMouseLeave={this.handleMouseOut} onMouseOver={() => this.handleHover(idx)} className={`direction-${direction}`}>
						<div className="flag-wrapper">
							<span className="flag">{item[this.props.flag]}</span>
							<span className="time-wrapper"><span className="time">{item[this.props.timeWrapper]}</span></span>
						</div>
						{this.state.hoveredItem !== null && this.state.hoveredItem === idx?
							<div className={`edit-icon-${direction}`}><span onClick={this.toggle}>
								<i className="far fa-edit"></i></span>
							</div> : null
						}
						{this.renderEditModal()}
						<div className="desc">{item[this.props.desc]}</div>
					</div>
				</li>
			)
		})
	}

    render() {
		if (typeof this.props.data != "undefined"
		&& this.props.data != null
		&& this.props.data.length != null
		&& this.props.data.length > 0){
			return (
				<ul className="timeline">
					{this.renderListItems()}
				</ul>
			);
		}
			
		return (
		<div className="small-text" >
			<p className="text-center">
				<i>Start adding your {this.props.for}s to increase credibility.</i>
			</p>
		</div>)	;
    }
}

export default Timeline;