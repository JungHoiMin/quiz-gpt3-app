import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import store from './store'
import router from './router'

createApp(App).use(router).use(store).use(Quasar, quasarUserOptions).mount('#app')
