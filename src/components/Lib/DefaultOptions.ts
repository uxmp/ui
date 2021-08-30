import store from './../Store/store'

const DefaultOptions: RequestInit = {
  headers: {
    'Authorization': `Bearer ${store.state.token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include'
};

export default DefaultOptions;