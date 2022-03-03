import noteBtns from './note-btns.cmp.js'

export default {
  props: ['note'],
  template: `
    <h2>Edit note</h2>
    <note-edit @edit-action="onEditNote"></note-edit>
  `,
  data() {
    return {}
  },
  components: {
    noteBtns,
  },
  created() {},
  components: {},
  methods: {
    onEditNote(action) {},
  },
  computed: {},
  unmounted: {},
}
