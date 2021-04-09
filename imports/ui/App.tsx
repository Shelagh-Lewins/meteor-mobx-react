import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PropTypes from 'prop-types';

import Info from './pages/Info.tsx';
import Env from './pages/Env.tsx';
import CounterView from './components/CounterView.tsx';
import CounterStore from '../api/client/CounterStore.tsx';

const store = new CounterStore();

const App = observer(class App extends React.Component {
	handleAddClick() {
		console.log('this.props', this.props);
		// this.props.route.state.addExample();
	}

	render() {
		// eslint-disable-next-line react/destructuring-assignment, react/prop-types
		const { links, linksLoading } = toJS(this.props.state);

		return (
			<div>
				<h1>Welcome to Meteor!</h1>
				<p>This text app explores a range of technologies in combination.</p>
				<CounterView store={store} />
				<h2>Links</h2>
				<Info
					links={links}
					linksLoading={linksLoading}
				/>
				<Env />
			</div>
		);
	}
});

App.propTypes = {
	'state': PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
