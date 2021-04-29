import CounterStore from './CounterStore.tsx';
import LinksStore from './LinksStore.tsx';
import PageStore from './PageStore.tsx';
import UsersStore from './UsersStore.tsx';

class RootStore {
	constructor() {
		this.counterStore = new CounterStore(this);
		this.linksStore = new LinksStore(this);
		this.pageStore = new PageStore(this);
		this.usersStore = new UsersStore(this);
	}
}

export default RootStore;
