import noteBtns from './note-btns.cmp.js'

export default {
  props: ['note'],
  template: `
    <div class="note-modal">
      <h2>Edit note</h2>
      <!-- TODO - Work on edit note modal -->
      <textarea :value="note.info.txt" v-model="newContent"></textarea>
      <note-edit @edit-action="onEditNote"></note-edit>
    </div>
  `,
  data() {
    return {
      newContent: '',
    }
  },
  components: {
    noteBtns,
  },
  created() {
    this.newContent = note.info.txt
  },
  components: {},
  methods: {
    onEditNote(action) {},
  },
  computed: {},
  unmounted: {},
}
