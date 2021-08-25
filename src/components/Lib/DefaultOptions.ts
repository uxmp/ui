import store from './../Store/store'

const DefaultOptions = {
  headers: {
    'Authorization': `Bearer ${store.state.token}`,
  },
};

export default DefaultOptions;