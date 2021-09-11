import { createApp } from 'vue'
import App from './App.vue'
import Router from './components/Lib/Router'
import Store from './components/Lib/Store'

createApp(App)
    .use(Router)
    .use(Store)
    .mount('#app')
