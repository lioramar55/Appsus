import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
      <div @click="toggleMenu" class="main-screen"></div>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {
    toggleMenu() {
      document.body.classList.toggle('show-menu')
    },
  },
}
