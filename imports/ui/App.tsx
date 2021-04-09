import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Info from './Info.tsx';
import Env from './Env.tsx';
import CounterView from './CounterView.tsx';
import CounterStore from '../api/client/CounterStore.tsx';

const store = new CounterStore();
/*
const App: React.FunctionComponent = () => (
	<div>
		<h1>Welcome to Meteor!</h1>
		<p>This text app explores a range of technologies in combination.</p>
		<CounterView store={store} />
		<Info />
		<Env />
	</div>
); */

const App = observer(class App extends React.Component {
	handleAddClick() {
		console.log('this.props', this.props);
		// this.props.route.state.addExample();
	}

	render() {
		const { links, linksLoading } = toJS(this.props.state);

		if (!linksLoading) {
			return (
				<div>
					<h2>Links</h2>
					<Info links={links} />
				</div>
			);
		}

		return (<div>Loading data...</div>);
	}
});

export default App;
