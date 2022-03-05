
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
      if(document.body.classList.contains('show-menu')){
        document.body.classList.toggle('show-menu')
      }else  document.body.classList.toggle('show-mail-menu')

    },
  },
}
