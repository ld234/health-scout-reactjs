import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import UpdatePasswordForm from './UpdatePasswordForm';
import BuyBundleForm from './BuyBundleForm';
import '../../../style/SettingsPage.css';

class SettingsPage extends React.Component {
	render() {
		return (
			<div className="setting-main-wrapper">
				<Collapsible>
					<CollapsibleItem header="Change password" icon="vpn_key">
						<UpdatePasswordForm />
					</CollapsibleItem>
					<CollapsibleItem header="Purchase connections" icon="payment">
						<BuyBundleForm />
					</CollapsibleItem>
				</Collapsible>
			</div>
		);
	}
}

export default SettingsPage;
