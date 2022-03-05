import { router } from './router.js'
import appFooter from './cmps/app-footer.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import mainScreen from './cmps/main-screen.cmp.js'
const options = {
  template: `
        <section class="main-app">
            <main-screen></main-screen>
            <app-header />
            <router-view />
            <app-footer />
          </section>
          <user-msg />
          `,
  components: {
    appHeader,
    appFooter,
    userMsg,
    mainScreen,
  },
}

const app = Vue.createApp(options)
app.use(router)
app.mount('#app')
