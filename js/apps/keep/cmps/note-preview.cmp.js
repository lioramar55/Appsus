import noteBtns from './note-btns.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'

export default {
  props: ['note'],
  template: `
  <article class="note-preview" :style="noteStyle">
    <component class="note-content" :is="note.type" 
    :note="note" @inform="onAction"></component>
    <note-btns :note="note" @edit-action="onEditAction"></note-btns>
  </article>
  `,
  data() {
    return {}
  },
  components: {
    noteBtns,
    noteTxt,
    noteVideo,
    noteImg,
    noteTodos,
  },
  created() {},
  methods: {
    onAction(action, value, note) {
      if (action === 'open-edit-note') {
        this.$emit(action, value)
      } else this.$emit('edit-note', action, value, note)
    },
    onEditAction(action, value) {
      this.$emit('edit-note', action, value, { ...this.note })
    },
  },
  computed: {
    noteStyle() {
      return this.note.style ? { 'background-color': this.note.style.backgroundColor } : ''
    },
  },
}
