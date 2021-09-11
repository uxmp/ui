import store from './Store'

export default {
  async request(
    path: string,
    method: string = 'GET',
    body: Object = {}
  ): Promise<Response> {
    let options: RequestInit = {
      method: method,
      headers: {
        'Authorization': `Bearer ${store.state.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }
    if (method === 'POST') {
      options.body = JSON.stringify(body)
    }

    return await fetch(
      import.meta.env.VITE_API_URL + path,
      options
    );
  }
}