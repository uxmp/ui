import { createApp } from 'vue'
import App from './App.vue'
import router from './components/Navigation/router'

createApp(App)
    .use(router)
    .mount('#app')
