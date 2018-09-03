import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import UpdatePasswordForm from './UpdatePasswordForm';
import '../../../style/SettingsPage.css';

class SettingsPage extends React.Component {
	render() {
		return (
			<div className="setting-main-wrapper">
				<Collapsible>
					<CollapsibleItem header="Change password" icon="filter_drama">
						<UpdatePasswordForm />
					</CollapsibleItem>
					<CollapsibleItem header="Purchase connections" icon="place">
						Lorem ipsum dolor sit amet.
					</CollapsibleItem>
				</Collapsible>
			</div>
		);
	}
}

export default SettingsPage;
