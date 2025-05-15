import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

console.log('Initializing app...')
app.use(pinia)
app.use(router)
app.use(Oruga)

app.mount('#app')
console.log('App mounted')
