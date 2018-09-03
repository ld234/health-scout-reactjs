import React from 'react';
import { Collapse } from 'mdbreact';

class Accordion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: [false, false],
		};
	}

	toggle = idx => {
		const newState = this.state.collapse.map((value, i) => {
			if (i === idx) {
				return !value;
			} else return value;
		});
		this.setState({
			collapse: newState,
		});
	};

	render() {
		const titleList = ['Change Password', 'Purchase Connections'];
		return (
			<div className="accordion-wrapper">
				{titleList.map((title, idx) => {
					return (
						<div key={titleList[idx]}>
							<div className="collapse-header" onClick={() => this.toggle(idx)}>
								<h4>{title}</h4>
								<i className={this.state.collapse[idx] ? 'fa fa-angle-up' : 'fa fa-angle-down'} />
							</div>
							<div>
								<Collapse
									isOpen={this.state.collapse[idx]}
									className={this.state.collapse[idx] ? 'collapse-body-wrapper' : ''}
								>
									<p>
										Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
										Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
									</p>
								</Collapse>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Accordion;
