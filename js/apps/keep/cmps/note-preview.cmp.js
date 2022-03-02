import noteEdit from './note-edit.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
  props: ['note'],
  template: `
  <article class="note-preview">
    <component :is="note.type" 
    :info="note.info" @inform="onAction"></component>
    <!-- <note-edit></note-edit> -->
  </article>
  `,
  data() {
    return {}
  },
  components: {
    noteEdit,
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
  },
}
