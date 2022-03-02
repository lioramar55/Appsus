export default {
  template: `
  <section class="note-edit">
    <button>
      <img @click.stop="onPinNote" src="assets/icons/pin.png">
    </button>
    <button>
      <img @click.stop="onDuplicate" src="assets/icons/duplicate.png">
    </button>
    <button>
      <img @click.stop="onChangeBG" src="assets/icons/paint.png">
    </button>
    <button>
      <img @click.stop="onEdit" src="assets/icons/edit.png">
    </button>
    <button>
      <img @click.stop="onExportToMail" src="assets/icons/export.png">
    </button>
    <button>
      <img @click.stop="onDeleteNote" src="assets/icons/export.png">
    </button>
  </section>
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
