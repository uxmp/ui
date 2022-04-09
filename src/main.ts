import { createApp } from 'vue'
import App from './App.vue'
import Router from './components/Lib/Router'
import Store from './components/Store/Store'
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSol } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import enLocaleMessages from './locales/en.json'
import deLocaleMessages from './locales/de.json'
import { createI18n } from 'vue-i18n';
import Player from './components/Lib/Player';
import Notifications from '@kyvg/vue3-notification'


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: Store.getters['authStorage/getLanguage'],
  fallbackLocale: 'en',
  messages: { en: enLocaleMessages, de: deLocaleMessages }
})

library.add(faPlay);
library.add(faPause);
library.add(faVolumeUp);
library.add(faVolumeOff);
library.add(faStepForward);
library.add(faStepBackward);
library.add(faStarSol);
library.add(faStarReg);
library.add(faMinusCircle);
library.add(faTools);
library.add(faPlus);
library.add(faTriangleExclamation);
library.add(faCircleCheck);

const emitter = mitt();

let app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Router)
  .use(Store)
  .use(i18n)
  .use(Notifications)
;

app.config.globalProperties.emitter = emitter;
app.provide('ply', new Player());

app.mount('#app')
