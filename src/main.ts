import { createApp } from 'vue'
import App from './App.vue'
import Router from './components/Lib/Router'
import Store from './components/Lib/Store'
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay);
library.add(faPause);
library.add(faVolumeUp);
library.add(faVolumeOff);
library.add(faStepForward);
library.add(faStepBackward);

const emitter = mitt();

let app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Router)
  .use(Store);

app.config.globalProperties.emitter = emitter;

app.mount('#app')
