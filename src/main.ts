import { createApp } from 'vue'
import Router from './components/Lib/Router'
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faFileCirclePlus, faPlay, faRectangleXmark} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSol } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import enLocaleMessages from './locales/en.json'
import deLocaleMessages from './locales/de.json'
import { createI18n } from 'vue-i18n';
import Player from './components/Lib/Player';
import Notifications from '@kyvg/vue3-notification'
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: enLocaleMessages, de: deLocaleMessages },
  datetimeFormats: {
    en: {
      date: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      datetime: {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      }
    },
    de: {
      date: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      datetime: {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
      }
    }
  }
})

library.add(
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeOff,
  faStepForward,
  faStepBackward,
  faStarSol,
  faStarReg,
  faMinusCircle,
  faTools,
  faTriangleExclamation,
  faCircleCheck,
  faShuffle,
  faRepeat,
  faFileCirclePlus,
  faArrowRightFromBracket,
  faUser,
  faMagnifyingGlass,
  faRectangleXmark,
);

const emitter = mitt();

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Router)
  .use(pinia)
  .use(i18n)
  .use(Notifications)
;

app.config.globalProperties.emitter = emitter;
app.provide('ply', new Player());

app.mount('#app')
