import noteEdit from './note-edit.cmp.js'

export default {
  props: ['note'],
  template: `
    <h2>Edit note</h2>
    <note-edit></note-edit>
  `,
  data() {
    return {}
  },
  components: {
    noteEdit,
  },
  created() {},
  components: {},
  methods: {},
  computed: {},
  unmounted: {},
}
