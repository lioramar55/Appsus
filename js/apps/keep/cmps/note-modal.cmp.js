import noteBtns from './note-btns.cmp.js'
export default {
  props: ['note'],
  template: `
    <div class="note-modal" :style="modalStyle">
      <h2 ref="title" contentEditable="true">{{note.info.title}}</h2>
      <div ref="txt" contentEditable="true">{{note.info.txt}}</div>
      <note-btns @edit-action="onEditNote" :note="note"></note-btns>
      <button class="close" @click="onSaveAndClose">Close</button>
    </div>
  `,
  data() {
    return {
      newNote: {
        txt: '',
        title: '',
      },
    }
  },
  components: {
    noteBtns,
  },
  created() {},
  mounted() {
    // this.$refs.textArea.addEventListener('keydown', this.resizeTextArea)
  },
  methods: {
    onSaveAndClose() {
      this.newNote.txt = this.$refs.txt.innerText
      this.newNote.title = this.$refs.title.innerText
      this.$emit('save-and-close', this.newNote, this.note)
    },
    onEditNote(action) {
      console.log('action', action)
    },
  },
  computed: {
    modalStyle() {
      let noteStyle = this.note.style
      if (noteStyle && noteStyle.background) {
        return { 'background-color': this.note.style.backgroundColor }
      } else return { 'background-color': '#444' }
    },
  },
}
