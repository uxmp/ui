import { createApp } from 'vue'
import App from './App.vue'
import router from './components/Navigation/router'
import store from './components/Store/store'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
