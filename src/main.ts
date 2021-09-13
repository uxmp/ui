import { createApp } from 'vue'
import App from './App.vue'
import Router from './components/Lib/Router'
import Store from './components/Lib/Store'
import mitt from 'mitt';

const emitter = mitt();

let app = createApp(App)
  .use(Router)
  .use(Store);

app.config.globalProperties.emitter = emitter;

app.mount('#app')
