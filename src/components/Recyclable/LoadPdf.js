import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

class LoadPdf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numPages: null,
			pageNumber: 1,
			lastScrollY: null,
			filepath: 'https://localhost:8080/api',
		};
	}
	handlePrevious = () => {
		if (this.state.pageNumber != 1) {
			this.setState({ pageNumber: this.state.pageNumber - 1 });
		}
	};

	handleNext = () => {
		if (this.state.pageNumber < this.state.numPages) this.setState({ pageNumber: this.state.pageNumber + 1 });
	};

	onDocumentLoad = ({ numPages }) => {
		this.setState({ numPages });
	};

	render() {
		const { pageNumber, numPages } = this.state;
		let filepath;
		if (this.props.data) {
			// filepath = {
			// 	url: 'https://localhost:8080/sapi' + this.props.data,
			// 	httpHeaders: { 'x-access-token': localStorage.getItem('localToken') },
			// };
			filepath = {
				data: this.props.data,
			};
		}
		return (
			<div>
				<Document file={filepath} onLoadSuccess={this.onDocumentLoad}>
					<Page pageNumber={pageNumber} width={600} />
				</Document>
				<span className="pdf-arrow-left" onClick={this.handlePrevious} />
				<span className="pdf-arrow-right" onClick={this.handleNext} />
				<p className="pdf-pagination">
					Page {pageNumber} of {numPages}
				</p>
			</div>
		);
	}
}
export default LoadPdf;
