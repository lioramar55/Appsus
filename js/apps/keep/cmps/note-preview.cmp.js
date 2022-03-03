import { noteService } from '../services/note-service.js'
import noteBtns from './note-btns.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
  props: ['note'],
  template: `
  <article class="note-preview" :style="noteStyle">
    <component class="note-content" :is="note.type" 
    :note="note" @inform="onAction"></component>
    <note-btns @edit-action="onEditAction"></note-btns>
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
    noteTodo,
  },
  created() {},
  methods: {
    onAction(action) {
      this.$emit('edit-note', action)
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
