import noteBtns from './note-btns.cmp.js'
export default {
  props: ['note'],
  template: `
    <div class="note-modal" :style="modalStyle">
      <h2 ref="title" contentEditable="true">{{title}}</h2>
      <div ref="txt" contentEditable="true">{{content}}</div>
      <div class="btn-section">
        <note-btns :note="note" :isNoteModal="true" class="modal-btns" @edit-action="onEditAction"></note-btns>
        <button class="close" @click="onSaveAndClose">Save</button>
      </div>
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
  mounted() {},
  methods: {
    onSaveAndClose() {
      this.newNote.txt = this.$refs.txt.innerText
      this.newNote.title = this.$refs.title.innerText
      this.$emit('save-and-close', this.newNote, this.note)
    },
    onEditAction(action) {},
  },
  computed: {
    content() {
      let type = this.note.type
      switch (type) {
        case 'note-txt':
          return this.note.info.txt
        case 'note-img':
          return this.note.info.url
        case 'note-video':
          return this.note.info.url
        case 'note-todos':
          let commaSepList = this.note.info.todos.map((todo) => todo.txt).join(',')
          return commaSepList
      }
    },
    title() {
      return this.note.type === 'note-todos' ? this.note.info.label : this.note.info.title
    },
    modalStyle() {
      let noteStyle = this.note.style
      if (noteStyle) {
        return { 'background-color': this.note.style.backgroundColor }
      } else return { 'background-color': '#444' }
    },
  },
}
