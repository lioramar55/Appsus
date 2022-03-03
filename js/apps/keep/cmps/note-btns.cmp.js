export default {
  props: ['note'],
  template: `
    <section class="note-edit">
      <div class="btns">
        <button class="icon" @click="onPin">
          <img  :src="isPinnedImg">
        </button>
        <button class="icon" @click="$emit('edit-action','duplicated')">
          <img  src="assets/icons/duplicate.png">
        </button>
          <button class="icon" @click="onPaint">
            <img  src="assets/icons/paint.png">
          </button>
       
        <button class="icon" @click="$emit('edit-action','edit')">
          <img  src="assets/icons/edit.png">
        </button>
        <button class="icon" @click="$emit('edit-action','export')">
          <img  src="assets/icons/export.png">
        </button>
      </div>
      <div v-if="colorPalleteOpen" class="color-picker">
        <div v-for="color in colors" 
        :style="{'background-color': color}" 
        @click="setPaintColor(color)" class="color"></div>
      </div>
    </section>
  `,
  data() {
    return {
      colorPalleteOpen: false,
      colors: ['#333', '#999', 'salmon', 'lightgreen', 'tomato', 'lightcyan'],
      isPinned: null,
    }
  },
  created() {},
  methods: {
    onPin() {
      this.$emit('edit-action', 'pinned')
    },
    onPaint() {
      this.colorPalleteOpen = !this.colorPalleteOpen
    },
    setPaintColor(color) {
      this.$emit('edit-action', 'paint', color)
      this.colorPalleteOpen = !this.colorPalleteOpen
    },
  },
  computed: {
    isPinnedImg() {
      return this.note.isPinned ? 'assets/icons/pinned.png' : 'assets/icons/pin.png'
    },
  },
}
