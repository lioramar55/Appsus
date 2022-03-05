export default {
  props: ['txt'],
  template: `
    <div v-if="txt" class="txt">
      <p>{{txtForDisplay}}</p>
      <button v-if="txt.length > 100" class="read-more"
       @click="onToggleView"
      >{{btnTxt}}</button>
    </div>
  `,
  data() {
    return {
      isToggled: false,
    }
  },
  created() {},
  methods: {
    onToggleView() {
      this.isToggled = !this.isToggled
    },
  },
  computed: {
    txtForDisplay() {
      if (!this.isToggled && this.txt.length > 100) return this.txt.slice(0, 100) + '...'
      else return this.txt
    },
    btnTxt() {
      return !this.isToggled ? 'Read more' : 'Read less'
    },
  },
}
