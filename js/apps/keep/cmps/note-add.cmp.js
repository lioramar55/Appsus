import noteAddBtns from './note-add-btns.cmp.js'
export default {
  template: `
    <div :style="{'background-color': pickedColor}" class="note-add">
      <div  class="note-add-layout">
        <input v-if="isAddingNote" type="text" v-model="note.info.title" placeholder="Choose a title">
        <div class="input-wrap">
          <input type="text" @focus="inputFocused" v-model="input" :placeholder="placeholderTxt">
          <note-add-btns @set-type="changeType" v-if="!isAddingNote"></note-add-btns>
        </div>
        <nav v-if="isAddingNote">
          <button class="icon">
            <img @click="colorPalleteOpen = !colorPalleteOpen" src="assets/icons/paint.png">
          </button>
          <note-add-btns @set-type="changeType"></note-add-btns>
          <button @click="closeAddNote">Close</button>
          <button @click="onSave">Save</button>
          <div v-if="colorPalleteOpen" class="color-picker">
            <div v-for="color in colors" 
            :style="{'background-color': color}" 
            @click="setPaintColor(color)" class="color"></div>
          </div>
        </nav>
      </div>
    </div>
  `,
  data() {
    return {
      isAddingNote: false,
      note: {
        info: {
          title: '',
        },
        style: {
          backgroundColor: '',
        },
        type: 'note-txt',
        isPinned: false,
      },
      input: '',
      pickedColor: '#333',
      colorPalleteOpen: false,
      colors: ['#333', '#999', 'salmon', 'lightgreen', 'tomato', 'lightcyan'],
    }
  },
  components: {
    noteAddBtns,
  },
  methods: {
    changeType(type) {
      this.note.type = type
    },
    setPaintColor(color) {
      this.colorPalleteOpen = !this.colorPalleteOpen
      this.note.style.backgroundColor = color
      this.pickedColor = color
    },
    inputFocused() {
      this.isAddingNote = true
    },
    closeAddNote() {
      this.isAddingNote = false
      this.note.title = ''
      this.note.txt = ''
    },
    onSave() {
      let type = this.note.type
      if (type === 'note-img' || type === 'note-audio') {
        this.note.info.url = this.input
      } else if (type === 'note-video') {
        if (this.input.search('embed') === -1) {
          let urlArray = this.input.split('/')
          let videoIdIdx = urlArray[urlArray.length - 1].search('v=')
          if (videoIdIdx === -1) {
            this.note.info.url = `https://www.youtube.com/embed/${urlArray[urlArray.length - 1]}`
          } else {
            let videoId = urlArray[urlArray.length - 1].slice(videoIdIdx + 2)
            let endIdx = videoId.indexOf('&')
            if (endIdx !== -1) {
              videoId = videoId.slice(0, endIdx)
            }
            this.note.info.url = `https://www.youtube.com/embed/${videoId}`
          }
        } else {
          this.note.info.url = this.input
        }
      }

      console.log('this.note.info.url', this.note.info.url)

      switch (type) {
        case 'note-txt':
          this.note.info.txt = this.input
          break
        case 'note-todos':
          this.note.info.todos = this.input.split(',').map((txt) => ({ txt, doneAt: null }))
      }
      this.input = ''
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
        case 'note-todos':
          text = 'Enter a comma seperated list...'
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
