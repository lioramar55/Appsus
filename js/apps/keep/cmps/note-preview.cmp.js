import noteEdit from './note-edit.cmp.js'

export default {
  template: `
  <!-- TODO -->
  <section class="note">
    note
    <!-- <component :is="note.type" 
     @inform="onEditNote" :info="info" ></component> -->
    <note-edit></note-edit>
  </section>
  `,
  data() {
    return {}
  },
  components: {
    noteEdit,
  },
  created() {},
  methods: {
    onEditNote(note) {
      this.$emit('edit-note', note)
    },
  },
  computed: {},
  unmounted: {},
}
