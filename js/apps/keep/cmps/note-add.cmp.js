export default {
  template: `
    <div class="note-add">
      <input v-if="isAddingNote" type="text" v-model="note.info.title" placeholder="Choose a title">
      <div class="input-wrap">
        <input type="text" @focus="inputFocused" v-model="note.info.txt" :placeholder="placeholderTxt">
        <button @click="changeType('note-txt')"><img src="assets/icons/text.png"></button>
        <button @click="changeType('note-img')"><img src="assets/icons/image.png"></button>
        <button @click="changeType('note-video')"><img src="assets/icons/video.png"></button>
        <button @click="changeType('note-audio')"><img src="assets/icons/audio.png"></button>
        <button @click="changeType('note-todo')"><img src="assets/icons/list.png"></button>
      </div>
      <nav v-if="isAddingNote">
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
