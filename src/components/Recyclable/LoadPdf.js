import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

class LoadPdf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numPages: null,
			pageNumber: 1,
			lastScrollY: null,
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
		let filepath = '';
		if (this.props.data) {
			filepath = 'api/' + this.props.data;
		}
		return (
			<div>
				<Document file={filepath} onLoadSuccess={this.onDocumentLoad}>
					<Page pageNumber={pageNumber} />
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
