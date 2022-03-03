import noteAddBtns from './note-add-btns.cmp.js'
export default {
  template: `
    <div class="note-add">
      <input v-if="isAddingNote" type="text" v-model="note.info.title" placeholder="Choose a title">
      <div class="input-wrap">
        <input type="text" @focus="inputFocused" v-model="note.info.txt" :placeholder="placeholderTxt">
        <note-add-btns @set-type="changeType" v-if="!isAddingNote"></note-add-btns>
      </div>
      <nav v-if="isAddingNote">
        <note-add-btns @set-type="changeType"></note-add-btns>
        <button @click="closeAddNote">Close</button>
        <button @click="onSave">Save</button>
      </nav>
    </div>
  `,
  data() {
    return {
      isAddingNote: false,
      note: {
        info: {
          title: '',
          txt: '',
        },
        style: {
          backgroundColor: '',
        },
        type: 'note-txt',
        isPinned: false,
      },
    }
  },
  components: {
    noteAddBtns,
  },
  methods: {
    changeType(type) {
      this.note.type = type
    },
    inputFocused() {
      this.isAddingNote = true
    },
    closeAddNote() {
      this.isAddingNote = false
      this.note.title = ''
      this.note.content = ''
    },
    onSave() {
      this.$emit('add-note', { ...this.note })
      this.closeAddNote()
    },
  },
  computed: {
    placeholderTxt() {
      let text = ''

      switch (this.note.type) {
        case 'note-txt':
          text = 'Take a note...'
          break
        case 'note-img':
          text = 'Enter image URL...'
          break
        case 'note-video':
          text = 'Enter video URL...'
          break
        case 'note-todo':
          text = 'Enter comma seperated list...'
          break
        case 'note-audio':
          text = 'Enter audio URL...'
          break
        default:
          break
      }
      return text
    },
  },
}
