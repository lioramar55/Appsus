export default {
  template: `
    <button>
      <img @click="onPinNote" src="assets/imgs/pin.png">
    </button>
    <button>
      <img @click="onDuplicateNote" src="assets/imgs/duplicate.png">
    </button>
    <button>
      <img @click="onChangeBG" src="assets/imgs/change-bg.png">
    </button>
  `,
  data() {
    return {}
  },
  created() {},
  components: {},
  methods: {
    onPinNote() {},
    onDuplicateNote() {},
    onChangeBG() {},
  },
  computed: {},
  unmounted: {},
}
